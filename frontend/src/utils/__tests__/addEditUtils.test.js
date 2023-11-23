import { describe, expect, test } from "@jest/globals";
import { isFormValid } from "../addEditUtils";
import dayjs from "dayjs";

describe("checks if add/edit task form is valid", () => {
  test("checks that a form with all inputs filled and correct dates is valid", () => {
    const formState = {
      title: "Correct title",
      description: "Correct description",
      startDate: dayjs(),
      endDate: dayjs().add(5, "minutes"),
      priority: 3,
      allDay: true,
    };
    expect(isFormValid(formState)).toBe(true);
  });

  test("checks that a form with all inputs filled but an end date before a start date is not valid", () => {
    const formState = {
      title: "Correct title",
      description: "Correct description",
      startDate: dayjs(),
      endDate: dayjs().subtract(5, "minutes"),
      priority: 3,
      allDay: true,
    };
    expect(isFormValid(formState)).toBe(false);
  });

  test("checks that a form with no title is not valid", () => {
    const formState = {
      title: "",
      description: "Correct description",
      startDate: dayjs(),
      endDate: dayjs().add(5, "minutes"),
      priority: 3,
      allDay: true,
    };
    expect(isFormValid(formState)).toBe(false);
  });

  test("checks that a form with a description of 254 characters is valid", () => {
    const formState = {
      title: "Correct title",
      description: Array(254).fill(".").join(""),
      startDate: dayjs(),
      endDate: dayjs().add(5, "minutes"),
      priority: 3,
      allDay: true,
    };
    expect(isFormValid(formState)).toBe(true);
  });

  test("checks that a form with a description of 255 characters is not valid", () => {
    const formState = {
      title: "Correct title",
      description: Array(255).fill(".").join(""),
      startDate: dayjs(),
      endDate: dayjs().add(5, "minutes"),
      priority: 3,
      allDay: true,
    };
    expect(isFormValid(formState)).toBe(false);
  });

  test("checks that an empty form is not valid", () => {
    const formState = {};
    expect(isFormValid(formState)).toBe(false);
  });
});
