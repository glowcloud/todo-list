import { describe, expect, test } from "@jest/globals";
import {
  isOverdue,
  getFilteredTasks,
  getColor,
  isEmail,
} from "../generalUtils";

describe("checks if email is correct", () => {
  test("checks if test@test.com is an email", () => {
    expect(isEmail("test@test.com")).toBe(true);
  });
  test("checks if test is an email", () => {
    expect(isEmail("test")).toBe(false);
  });
  test("checks if test.com is an email", () => {
    expect(isEmail("test.com")).toBe(false);
  });
  test("checks if test@.com is an email", () => {
    expect(isEmail("test@.com")).toBe(false);
  });
});


