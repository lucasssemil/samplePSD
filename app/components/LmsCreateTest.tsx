"use client";

import { TEST_CATEGORIES } from "../lib/tests";

type Props = {
  onBack: () => void;
};

export function LmsCreateTest({ onBack }: Props) {
  return (
    <>
      <div className="page-head">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn-back"
            onClick={onBack}
            aria-label="Back to test list"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <div>
            <h1 className="page-title">Create New Test</h1>
            <p className="page-sub">Fill in the test information below</p>
          </div>
        </div>
      </div>

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">Test Information</h2>
        </div>

        <div className="panel-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Test Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Basic Food Safety & Hygiene"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Test Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. TST-007"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select className="form-select" defaultValue="">
                <option value="" disabled>
                  Select category
                </option>
                {TEST_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Duration (minutes)</label>
              <input type="number" className="form-control" placeholder="30" />
            </div>

            <div className="col-md-3">
              <label className="form-label">Passing Score</label>
              <input type="number" className="form-control" placeholder="75" />
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Short description of this test..."
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select className="form-select" defaultValue="Draft">
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Questions</h2>
          <button type="button" className="btn-brand btn-brand-sm">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Question
          </button>
        </div>

        <div className="panel-body">
          <div className="question-card">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <span className="question-index">Question 1</span>
              <span className="badge-status badge-draft">Multiple Choice</span>
            </div>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Type the question here..."
            />

            <div className="row g-2">
              {["A", "B", "C", "D"].map((option) => (
                <div className="col-md-6" key={option}>
                  <div className="option-row">
                    <input
                      type="radio"
                      name="q1-answer"
                      className="form-check-input mt-0"
                      aria-label={`Correct answer ${option}`}
                    />
                    <span className="option-letter">{option}</span>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder={`Option ${option}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="empty-text mt-3 mb-0">
            Select the radio button next to the correct answer.
          </p>
        </div>

        <div className="panel-foot justify-content-end gap-2">
          <button type="button" className="btn-ghost" onClick={onBack}>
            Cancel
          </button>
          <button type="button" className="btn-brand">
            Save Test
          </button>
        </div>
      </section>
    </>
  );
}
