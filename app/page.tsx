"use client";

import { useState } from "react";
import { AdminDashboard } from "./components/AdminDashboard";
import { Assessment360List } from "./components/Assessment360List";
import { CompanySurveyDetail } from "./components/CompanySurveyDetail";
import { CompanySurveyList } from "./components/CompanySurveyList";
import type { EmployeeProfile } from "./components/EmployeeEditModal";
import { EmployeeMasterList } from "./components/EmployeeMasterList";
import { EmployeeReport } from "./components/EmployeeReport";
import { EmployeeTrainingDetail } from "./components/EmployeeTrainingDetail";
import { EmployeeTrainingList } from "./components/EmployeeTrainingList";
import { LmsCreateTest } from "./components/LmsCreateTest";
import { LmsTestList } from "./components/LmsTestList";
import { Sidebar } from "./components/Sidebar";
import { UserAssessment } from "./components/UserAssessment";
import { UserDashboard } from "./components/UserDashboard";
import { UserSurvey } from "./components/UserSurvey";
import { UserTraining } from "./components/UserTraining";
import { UserTrainingDetail } from "./components/UserTrainingDetail";
import { Topbar } from "./components/Topbar";
import {
  CURRENT_EMPLOYEE_ID,
  EMPLOYEE_LIST,
  type EmployeeRow,
} from "./lib/employees";
import { menuForRole, type Role } from "./lib/menu";

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
  // Employee records live here so a profile edited in Employee Master is also
  // reflected in Employee Training.
  const [employees, setEmployees] = useState<EmployeeRow[]>(EMPLOYEE_LIST);

  function saveProfile(id: string, profile: EmployeeProfile) {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === id ? { ...employee, ...profile } : employee
      )
    );
  }

  function toggleRole() {
    const next: Role = role === "admin" ? "user" : "admin";
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

  const active = menuForRole(role).find(
    (entry) => entry.kind === "item" && entry.id === activeId
  );
  const title = active?.kind === "item" ? active.label : "Dashboard";

  const isLms = role === "admin" && activeId === "lms";
  const isEmployeeTraining = role === "admin" && activeId === "employee-training";
  const isEmployeeMaster = role === "admin" && activeId === "employee-master";
  const currentUser = employees.find(
    (employee) => employee.id === CURRENT_EMPLOYEE_ID
  );

  const isDashboard = role === "admin" && activeId === "dashboard";
  const isReport = role === "admin" && activeId === "employee-report";
  const isAssessment = role === "admin" && activeId === "assessment";
  const isSurvey = role === "admin" && activeId === "survey";

  function renderContent() {
    if (role === "user") {
      if (activeId === "dashboard") {
        return <UserDashboard employee={currentUser} onOpen={selectMenu} />;
      }
      if (activeId === "training") {
        const training = currentUser?.assigned.find(
          (item) => item.id === assignmentId
        );
        return view === "training-detail" && training ? (
          <UserTrainingDetail item={training} onBack={backToList} />
        ) : (
          <UserTraining employee={currentUser} onOpen={openTraining} />
        );
      }
      if (activeId === "assessment") {
        return <UserAssessment />;
      }
      if (activeId === "survey") {
        return <UserSurvey />;
      }
    }

    if (isDashboard) {
      return <AdminDashboard employees={employees} onOpen={selectMenu} />;
    }

    if (isReport) {
      return <EmployeeReport employees={employees} />;
    }

    if (isLms) {
      return view === "create-test" ? (
        <LmsCreateTest onBack={() => setView("list")} />
      ) : (
        <LmsTestList onCreate={() => setView("create-test")} />
      );
    }

    if (isEmployeeTraining) {
      return view === "employee-detail" && employeeId ? (
        <EmployeeTrainingDetail
          employee={selectedEmployee}
          onBack={backToList}
        />
      ) : (
        <EmployeeTrainingList employees={employees} onDetail={openEmployee} />
      );
    }

    if (isEmployeeMaster) {
      return (
        <EmployeeMasterList employees={employees} onSaveProfile={saveProfile} />
      );
    }

    if (isAssessment) {
      return <Assessment360List employees={employees} />;
    }

    if (isSurvey) {
      return view === "survey-detail" && employeeId ? (
        <CompanySurveyDetail employee={selectedEmployee} onBack={backToList} />
      ) : (
        <CompanySurveyList employees={employees} onDetail={openSurvey} />
      );
    }

    return (
      <>
        <div className="page-head">
          <div>
            <h1 className="page-title">{title}</h1>
            <p className="page-sub">
              {role === "admin" ? "Admin workspace" : "Employee workspace"}
            </p>
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
            <p className="empty-title">Nothing here yet</p>
            <p className="empty-text">
              This area is intentionally empty for the mockup.
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
        onToggleRole={toggleRole}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <Sidebar
        role={role}
        activeId={activeId}
        onSelect={selectMenu}
        open={sidebarOpen}
      />

      <main className="content">{renderContent()}</main>
    </div>
  );
}
