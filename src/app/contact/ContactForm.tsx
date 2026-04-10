'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { sendContactRequest, type ContactFormState, type ContactFormValues } from './actions';

type ContactCategory = {
  value: string;
  label: string;
  description?: string;
};

type ContactFormProps = {
  categories: ContactCategory[];
  initialThreadId: string;
};

function SubmitButton() {
  return (
    <button className="btn btn-primary" type="submit">
      Send request
    </button>
  );
}

export default function ContactForm({ categories, initialThreadId }: ContactFormProps) {
  const initialCategory = categories[0];

  const initialState = useMemo<ContactFormState>(
    () => ({
      ok: false,
      threadId: initialThreadId,
      values: {
        name: '',
        email: '',
        company: '',
        detailsUrl: '',
        category: initialCategory?.value ?? '',
        categoryLabel: initialCategory?.label ?? '',
        threadId: initialThreadId,
        message: '',
      },
    }),
    [initialCategory?.label, initialCategory?.value, initialThreadId]
  );

  const [state, formAction] = useActionState(sendContactRequest, initialState);
  const [values, setValues] = useState<ContactFormValues>(initialState.values);

  useEffect(() => {
    setValues(state.values);
  }, [state.values]);

  const selectedCategory =
    categories.find((category) => category.value === values.category) ?? initialCategory;

  const handleChange =
    (field: keyof ContactFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      setValues((current) => {
        if (field === 'category') {
          const category =
            categories.find((item) => item.value === nextValue) ?? categories[0];
          return {
            ...current,
            category: nextValue,
            categoryLabel: category?.label ?? '',
          };
        }

        return {
          ...current,
          [field]: nextValue,
        };
      });
    };

  return (
    <form className="feature-card card bg-base-100 shadow-xl contact-form" action={formAction} noValidate>
      <div className="contact-form-head">
        <div>
          <p className="contact-kicker">Contact Sonicverse</p>
          <h2>Send a request</h2>
          <p className="contact-subtitle">
            Share the goal, timeline, and the best way for the maintainers to follow up.
          </p>
        </div>
        <div
          className="contact-stage-card card bg-base-200 shadow-sm"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="contact-stage-eyebrow">Thread ID</p>
          <p className="contact-stage-copy">{state.threadId}</p>
        </div>
      </div>

      <ul className="contact-trust" aria-label="Contact form highlights">
        <li>The thread ID is included in both email subject lines for follow-up</li>
        <li>Choose a single request type so the right maintainers can pick it up quickly</li>
        <li>Reference links are optional, but helpful for bugs, pilots, and roadmap requests</li>
      </ul>

      {state.message && (
        <p
          className={`alert ${state.ok ? 'alert-success' : 'alert-error'} form-status ${state.ok ? 'form-status-success' : 'form-status-error'}`}
          role={state.ok ? 'status' : 'alert'}
        >
          {state.message}
        </p>
      )}

      <input className="contact-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="hidden" name="threadId" value={state.threadId} />
      <input type="hidden" name="categoryLabel" value={selectedCategory?.label ?? values.categoryLabel} />

      <div className="contact-field-grid contact-field-grid-split">
        <div className="contact-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            className={`input input-bordered w-full ${state.errors?.name ? 'input-error' : ''}`}
            value={values.name}
            onChange={handleChange('name')}
            aria-invalid={state.errors?.name ? 'true' : undefined}
            aria-describedby={state.errors?.name ? 'name-error' : undefined}
          />
          {state.errors?.name && (
            <p id="name-error" className="field-error" role="alert">
              {state.errors.name}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="email">Work email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`input input-bordered w-full ${state.errors?.email ? 'input-error' : ''}`}
            value={values.email}
            onChange={handleChange('email')}
            aria-invalid={state.errors?.email ? 'true' : undefined}
            aria-describedby={state.errors?.email ? 'email-error' : undefined}
          />
          {state.errors?.email && (
            <p id="email-error" className="field-error" role="alert">
              {state.errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="company">Company or organization</label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={120}
          className={`input input-bordered w-full ${state.errors?.company ? 'input-error' : ''}`}
          value={values.company}
          onChange={handleChange('company')}
          aria-invalid={state.errors?.company ? 'true' : undefined}
          aria-describedby={state.errors?.company ? 'company-error' : undefined}
        />
        {state.errors?.company && (
          <p id="company-error" className="field-error" role="alert">
            {state.errors.company}
          </p>
        )}
      </div>

      <fieldset className="contact-step-panel active">
        <legend>What do you need help with?</legend>
        <p className="contact-panel-intro">
          Pick the closest request type. We route from here, so there is no extra routing dropdown to decipher.
        </p>

        <div className="contact-choice-grid">
          {categories.map((category, index) => (
            <label key={category.value} className="contact-choice-card" htmlFor={`category-${index}`}>
              <input
                id={`category-${index}`}
                type="radio"
                name="category"
                value={category.value}
                className="radio radio-primary"
                checked={values.category === category.value}
                onChange={handleChange('category')}
                aria-invalid={state.errors?.category ? 'true' : undefined}
                aria-describedby={state.errors?.category ? 'category-error category-help' : 'category-help'}
              />
              <span className="contact-choice-card-copy card bg-base-200 shadow-sm">
                <strong>{category.label}</strong>
                {category.description && <span>{category.description}</span>}
              </span>
            </label>
          ))}
        </div>
        <p id="category-help" className="contact-note">
          {selectedCategory?.description ?? 'Choose the closest request type. We use it to route the follow-up.'}
        </p>
        {state.errors?.category && (
          <p id="category-error" className="field-error" role="alert">
            {state.errors.category}
          </p>
        )}
      </fieldset>

      <div className="contact-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={8}
          required
          maxLength={3000}
          className={`textarea textarea-bordered w-full ${state.errors?.message ? 'textarea-error' : ''}`}
          value={values.message}
          onChange={handleChange('message')}
          aria-invalid={state.errors?.message ? 'true' : undefined}
          aria-describedby={state.errors?.message ? 'message-error message-help' : 'message-help'}
        />
        <div className="contact-inline-meta">
          <p id="message-help" className="contact-note">
            Include expected behavior, actual behavior, scope, or decision-makers when relevant.
          </p>
          <p className="contact-count">{values.message.length} / 3000</p>
        </div>
        {state.errors?.message && (
          <p id="message-error" className="field-error" role="alert">
            {state.errors.message}
          </p>
        )}
      </div>

      <div className="contact-field">
        <label htmlFor="detailsUrl">Reference URL (optional)</label>
        <input
          id="detailsUrl"
          name="detailsUrl"
          type="url"
          inputMode="url"
          className={`input input-bordered w-full ${state.errors?.detailsUrl ? 'input-error' : ''}`}
          value={values.detailsUrl}
          onChange={handleChange('detailsUrl')}
          aria-invalid={state.errors?.detailsUrl ? 'true' : undefined}
          aria-describedby={state.errors?.detailsUrl ? 'detailsUrl-error' : undefined}
        />
        {state.errors?.detailsUrl && (
          <p id="detailsUrl-error" className="field-error" role="alert">
            {state.errors.detailsUrl}
          </p>
        )}
      </div>

      <div className="contact-review card bg-base-200 shadow-sm" aria-live="polite">
        <p className="contact-review-kicker">Submission preview</p>
        <div className="contact-review-grid">
          <div>
            <span>Reply to</span>
            <strong>{values.name || 'Your contact details will appear here'}</strong>
          </div>
          <div>
            <span>Request type</span>
            <strong>{selectedCategory?.label || 'Choose a request type'}</strong>
          </div>
          <div>
            <span>Thread ID</span>
            <strong>{state.threadId}</strong>
          </div>
        </div>
        <p className="contact-note">
          This same thread ID is submitted with the form and appears in both email subject lines for follow-up.
        </p>
      </div>

      <div className="contact-nav-row">
        <SubmitButton />
      </div>
    </form>
  );
}
