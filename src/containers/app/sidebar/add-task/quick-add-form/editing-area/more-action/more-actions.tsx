import AddExtension from "./add-extension";
import EditTaskActions from "./edit-task-actions";
import MoreActionsMenu from "./more-actions-menu";
import MoreActionsMenuButton from "./more-actions-menu-button";
import MoreActionsMenuPanel from "./more-actions-menu-panel";

type MoreActionsProps = {
  disabled?: boolean;
};

export default function MoreActions({ disabled = false }: MoreActionsProps) {
  return (
    <MoreActionsMenu disabled={disabled}>
      <MoreActionsMenuButton />
      <MoreActionsMenuPanel>
        <div role="group" className="p-1.5">
          <AddExtension />
        </div>
        <hr className="h-px border-0 bg-divider-primary" />
        <div role="group" className="p-1.5">
          <EditTaskActions />
        </div>
      </MoreActionsMenuPanel>
    </MoreActionsMenu>
  );
}
