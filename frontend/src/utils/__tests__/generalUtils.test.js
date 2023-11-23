import { describe, expect, test } from "@jest/globals";
import { isOverdue, getFilteredTasks, isEmail } from "../generalUtils";
import dayjs from "dayjs";

describe("checks if email is correct", () => {
  test("checks that test@test.com is an email", () => {
    expect(isEmail("test@test.com")).toBe(true);
  });

  test("checks that test is not an email", () => {
    expect(isEmail("test")).toBe(false);
  });

  test("checks that test.com is not an email", () => {
    expect(isEmail("test.com")).toBe(false);
  });

  test("checks that test@.com is not an email", () => {
    expect(isEmail("test@.com")).toBe(false);
  });
});

describe("checks if task is overdue", () => {
  test("checks that task with an end date of yesterday is overdue", () => {
    const task = {
      id: "1",
      endDate: dayjs().subtract(1, "day"),
    };
    expect(isOverdue(task)).toBe(true);
  });

  test("checks that task with an end date of tomorrow is not overdue", () => {
    const task = {
      id: "1",
      endDate: dayjs().add(1, "day"),
    };
    expect(isOverdue(task)).toBe(false);
  });

  test("checks that task with an end date of today but all day status is not overdue", () => {
    const task = {
      id: "1",
      endDate: dayjs().subtract(5, "minutes"),
      allDay: true,
    };
    expect(isOverdue(task)).toBe(false);
  });

  test("checks that task with an end date of today and no all day status is overdue", () => {
    const task = {
      id: "1",
      endDate: dayjs().subtract(5, "minutes"),
      allDay: false,
    };
    expect(isOverdue(task)).toBe(true);
  });
});

describe("gets filtered and sorted tasks", () => {
  const tasks = [
    {
      id: 1,
      title: "buy milk",
      description: "",
      startDate: dayjs(),
      endDate: dayjs().add(15, "minutes"),
      priority: { id: 2 },
      finished: false,
    },
    {
      id: 2,
      title: "fix the code",
      description: "fix a bug in your code",
      startDate: dayjs().subtract(1, "day"),
      endDate: dayjs().add(1, "day"),
      priority: { id: 1 },
      finished: false,
    },
    {
      id: 3,
      title: "fix a bug but finished",
      description: "",
      startDate: dayjs(),
      endDate: dayjs().add(15, "minutes"),
      priority: { id: 5 },
      finished: true,
    },
    {
      id: 4,
      title: "fix a bug tomorrow",
      description: "",
      startDate: dayjs().add(1, "day"),
      endDate: dayjs().add(1, "day"),
      priority: { id: 3 },
      finished: false,
    },
    {
      id: 5,
      title: "overdue task",
      description: "",
      startDate: dayjs().subtract(15, "minutes"),
      endDate: dayjs().subtract(10, "minutes"),
      priority: { id: 3 },
      finished: false,
    },
  ];

  test("gets tasks scheduled for today and not finished", () => {
    const filteredTasks = getFilteredTasks(
      tasks,
      "day",
      dayjs(),
      [],
      "none",
      "",
      false,
      false
    );
    expect(filteredTasks.length).toBe(3);
    expect(filteredTasks[0].id).toBe(1);
    expect(filteredTasks[1].id).toBe(2);
    expect(filteredTasks[2].id).toBe(5);
  });

  test("gets tasks scheduled for today and sorted by priorities", () => {
    const filteredTasks = getFilteredTasks(
      tasks,
      "day",
      dayjs(),
      [],
      "priority",
      "",
      false,
      false
    );
    expect(filteredTasks.length).toBe(3);
    expect(filteredTasks[0].id).toBe(2);
    expect(filteredTasks[1].id).toBe(1);
    expect(filteredTasks[2].id).toBe(5);
  });

  test("gets tasks scheduled for today and filtered by highest priority", () => {
    const filteredTasks = getFilteredTasks(
      tasks,
      "day",
      dayjs(),
      [1],
      "none",
      "",
      false,
      false
    );
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].id).toBe(2);
  });

  test("gets unfinished tasks with a title or description containing the word bug", () => {
    const filteredTasks = getFilteredTasks(
      tasks,
      "overall",
      dayjs(),
      [],
      "",
      "bug",
      false,
      false
    );
    expect(filteredTasks.length).toBe(2);
    expect(filteredTasks[0].id).toBe(2);
    expect(filteredTasks[1].id).toBe(4);
  });

  test("gets no tasks when no tasks are provided", () => {
    const filteredTasks = getFilteredTasks(
      [],
      "overall",
      dayjs(),
      [],
      "",
      "",
      false,
      false
    );
    expect(filteredTasks.length).toBe(0);
  });

  test("gets overdue tasks scheduled for today", () => {
    const filteredTasks = getFilteredTasks(
      tasks,
      "day",
      dayjs(),
      [],
      "none",
      "",
      true,
      false
    );
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].id).toBe(5);
  });
});
