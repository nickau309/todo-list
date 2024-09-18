import Checkbox from "./checkbox";
import Info from "./info";
import ResetAfterSubmission from "./reset-after-submission";

export default function Overview() {
  return (
    <>
      <ResetAfterSubmission />
      <div className="flex">
        <Checkbox />
        <Info />
      </div>
    </>
  );
}
