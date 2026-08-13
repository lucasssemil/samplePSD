"use client";

import { useState } from "react";
import { AdminDashboard } from "./pages/dashboard/AdminDashboard";
import type { ApprovalPayload } from "./pages/employee-exit/ApproveResignModal";
import type { AssessmentSubmission } from "./pages/assessment-360/AssessmentFormModal";
import { AssessmentMaster } from "./pages/assessment-master/AssessmentMaster";
import { CompanySurveyDetail } from "./pages/survey/CompanySurveyDetail";
import { CompanySurveyList } from "./pages/survey/CompanySurveyList";
import type { EmployeeProfile } from "./pages/employee-master/EmployeeEditModal";
import { EmployeeMasterList } from "./pages/employee-master/EmployeeMasterList";
import { EmployeeExitList } from "./pages/employee-exit/EmployeeExitList";
import { EmployeeReport } from "./pages/employee-report/EmployeeReport";
import { EmployeeTrainingDetail } from "./pages/employee-training/EmployeeTrainingDetail";
import { EmployeeTrainingList } from "./pages/employee-training/EmployeeTrainingList";
import { LmsCreateTest } from "./pages/lms/LmsCreateTest";
import { LmsTestList } from "./pages/lms/LmsTestList";
import { Assessment360, buildReview } from "./pages/assessment-360/Assessment360";
import { Footer } from "./components/Footer";
import { Sidebar } from "./components/Sidebar";
import { UserDashboard } from "./pages/dashboard/UserDashboard";
import type { ResignSubmission } from "./pages/dashboard/ResignFormModal";
import { UserSurvey } from "./pages/survey/UserSurvey";
import { UserTraining } from "./pages/training/UserTraining";
import { UserTrainingDetail } from "./pages/training/UserTrainingDetail";
import { Topbar } from "./components/Topbar";
import { REVIEW_HISTORY, type AssessmentEntry } from "./lib/assessments";
import {
  CURRENT_EMPLOYEE_ID,
  CURRENT_SUPERVISOR_ID,
  EMPLOYEE_LIST,
  teamOf,
  type EmployeeRow,
} from "./lib/employees";
import { KPI_MINIMUMS, type KpiMinimum } from "./lib/kpiMinimum";
import {
  ROLE_SUBTITLE,
  canAccess,
  menuForRole,
  type Role,
} from "./lib/menu";
import { RESIGN_LETTERS, type ResignLetter } from "./lib/resignations";

type View =
  | "list"
  | "create-test"
  | "employee-detail"
  | "survey-detail"
  | "training-detail";

export default function Home() {
  const [role, setRole] = useState<Role>("user");
  const [activeId, setActiveId] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<View>("list");
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [assignmentId, setAssignmentId] = useState<string | null>(null);
  // Employee records live here so a profile edited in Master Karyawan is also
  // reflected everywhere else.
  const [employees, setEmployees] = useState<EmployeeRow[]>(EMPLOYEE_LIST);
  // Resign letters are shared too: a letter sent from the employee dashboard
  // shows up in the admin Karyawan Keluar list.
  const [letters, setLetters] = useState<ResignLetter[]>(RESIGN_LETTERS);
  const [reviews, setReviews] = useState<AssessmentEntry[]>(REVIEW_HISTORY);
  const [minimums, setMinimums] = useState<KpiMinimum[]>(KPI_MINIMUMS);

  function submitResign(submission: ResignSubmission) {
    setLetters((current) => [
      {
        id: `r-${Date.now()}`,
        employeeId: signedInId,
        category: submission.category,
        resignDate: submission.resignDate,
        reason: submission.reason,
        submittedAt: "13 Agu 2026",
        status: "Menunggu",
        exitInterviewDate: null,
        handOverPlanDate: null,
      },
      ...current,
    ]);
  }

  function approveResign(letterId: string, payload: ApprovalPayload) {
    setLetters((current) =>
      current.map((letter) =>
        letter.id === letterId
          ? {
              ...letter,
              status: "Disetujui",
              exitInterviewDate: payload.exitInterviewDate,
              handOverPlanDate: payload.handOverPlanDate,
            }
          : letter
      )
    );
  }

  function saveProfile(id: string, profile: EmployeeProfile) {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === id ? { ...employee, ...profile } : employee
      )
    );
  }

  function addReview(id: string, submission: AssessmentSubmission) {
    const entry = buildReview(id, submission);
    setReviews((current) => [...current, entry]);
    // The newest review becomes the employee's current KPI score.
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === id ? { ...employee, kpiScore: entry.score } : employee
      )
    );
  }

  function saveMinimum(level: KpiMinimum["level"], minScore: number) {
    setMinimums((current) =>
      current.map((item) =>
        item.level === level ? { ...item, minScore } : item
      )
    );
  }

  function changeRole(next: Role) {
    setRole(next);
    setActiveId("dashboard");
    setView("list");
    setEmployeeId(null);
    setAssignmentId(null);
  }

  function selectMenu(id: string) {
    setActiveId(id);
    setSidebarOpen(false);
    setView("list");
    setEmployeeId(null);
    setAssignmentId(null);
  }

  function openEmployee(id: string) {
    setEmployeeId(id);
    setView("employee-detail");
  }

  function openSurvey(id: string) {
    setEmployeeId(id);
    setView("survey-detail");
  }

  function backToList() {
    setView("list");
    setEmployeeId(null);
    setAssignmentId(null);
  }

  function openTraining(id: string) {
    setAssignmentId(id);
    setView("training-detail");
  }

  const selectedEmployee = employees.find(
    (employee) => employee.id === employeeId
  );

  // Supervisors are employees too — they get their own training, survey and
  // resign form on the same pages the plain employee uses.
  const signedInId =
    role === "supervisor" ? CURRENT_SUPERVISOR_ID : CURRENT_EMPLOYEE_ID;
  const currentUser = employees.find((employee) => employee.id === signedInId);

  // A supervisor reviews and offboards their own team; the admin sees everyone.
  const scopedEmployees =
    role === "supervisor" ? teamOf(signedInId, employees) : employees;
  const scopedLetters =
    role === "supervisor"
      ? letters.filter((letter) =>
          scopedEmployees.some((member) => member.id === letter.employeeId)
        )
      : letters;

  const active = menuForRole(role).find(
    (entry) => entry.kind === "item" && entry.id === activeId
  );
  const title = active?.kind === "item" ? active.label : "Dashboard";

  /** One switch per page, guarded by the role's menu array in lib/menu.ts. */
  function renderContent() {
    if (!canAccess(role, activeId)) return renderEmpty();

    switch (activeId) {
      case "dashboard":
        return role === "admin" ? (
          <AdminDashboard role={role} employees={employees} onOpen={selectMenu} />
        ) : (
          <UserDashboard
            role={role}
            employee={currentUser}
            team={role === "supervisor" ? scopedEmployees : []}
            reviews={reviews}
            onOpen={selectMenu}
            onSubmitResign={submitResign}
          />
        );

      case "training": {
        const training = currentUser?.assigned.find(
          (item) => item.id === assignmentId
        );
        return view === "training-detail" && training ? (
          <UserTrainingDetail item={training} onBack={backToList} />
        ) : (
          <UserTraining employee={currentUser} onOpen={openTraining} />
        );
      }

      case "survey":
        // The employee side sends a survey; the admin side reads the inbox.
        if (role !== "admin") return <UserSurvey employeeId={signedInId} />;
        return view === "survey-detail" && employeeId ? (
          <CompanySurveyDetail employee={selectedEmployee} onBack={backToList} />
        ) : (
          <CompanySurveyList employees={employees} onDetail={openSurvey} />
        );

      case "employee-training":
        return view === "employee-detail" && employeeId ? (
          <EmployeeTrainingDetail
            employee={selectedEmployee}
            onBack={backToList}
          />
        ) : (
          <EmployeeTrainingList employees={employees} onDetail={openEmployee} />
        );

      case "assessment-360":
        return (
          <Assessment360
            employees={scopedEmployees}
            reviews={reviews}
            minimums={minimums}
            onAdd={addReview}
          />
        );

      case "employee-exit":
        return (
          <EmployeeExitList
            employees={employees}
            letters={scopedLetters}
            onApprove={approveResign}
          />
        );

      case "assessment-master":
        return (
          <AssessmentMaster
            employees={employees}
            minimums={minimums}
            onSave={saveMinimum}
          />
        );

      case "employee-master":
        return (
          <EmployeeMasterList
            employees={employees}
            onSaveProfile={saveProfile}
          />
        );

      case "lms":
        return view === "create-test" ? (
          <LmsCreateTest onBack={() => setView("list")} />
        ) : (
          <LmsTestList onCreate={() => setView("create-test")} />
        );

      case "employee-report":
        return <EmployeeReport employees={employees} />;

      default:
        return renderEmpty();
    }
  }

  function renderEmpty() {
    return (
      <>
        <div className="page-head">
          <div>
            <h1 className="page-title">{title}</h1>
            <p className="page-sub">{ROLE_SUBTITLE[role]}</p>
          </div>
        </div>

        <section className="panel panel-empty">
          <div>
            <svg
              width="54"
              height="54"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d8c9b8"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 9h18M8 13h8M8 16.5h5" />
            </svg>
            <p className="empty-title">Belum ada isinya</p>
            <p className="empty-text">
              Bagian ini memang dikosongkan untuk mockup.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="app-shell">
      <Topbar
        role={role}
        onChangeRole={changeRole}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        onHome={() => selectMenu("dashboard")}
      />

      {sidebarOpen ? (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <Sidebar
        role={role}
        activeId={activeId}
        onSelect={selectMenu}
        open={sidebarOpen}
      />

      <main className="content">
        {renderContent()}
        <Footer />
      </main>
    </div>
  );
}
