import dayjs from "@/lib/dayjs";
import type { FormEvent } from "react";
import { useState } from "react";
import { useDueDatePopover } from "./due-date-popover";
import SetDueDateError from "./set-due-date-error";
import SetDueDateInput from "./set-due-date-input";
import SetDueDatePreview from "./set-due-date-preview";
import getInputDate from "./utils/get-input-date";

export default function SetDueDateForm() {
  const { dueDate, setDueDate, setIsOpen } =
    useDueDatePopover("SetDueDateForm");

  const [inputValue, setInputValue] = useState(() => {
    if (dueDate !== null) {
      const today = dayjs();
      if (today.isSame(dueDate, "year")) {
        return dayjs(dueDate).format("D MMM");
      }
      return dayjs(dueDate).format("D MMM YYYY");
    }
    return "";
  });
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputDate !== null) {
      setDueDate(inputDate);
      setIsOpen(false);
    } else {
      setShowError(true);
    }
  };

  const inputDate = getInputDate(inputValue, dueDate);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <SetDueDateInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        setShowError={setShowError}
      />
      <div role="alert" className="flex flex-col">
        {showError ? (
          <SetDueDateError />
        ) : (
          inputDate !== null && <SetDueDatePreview inputDate={inputDate} />
        )}
      </div>
    </form>
  );
}
