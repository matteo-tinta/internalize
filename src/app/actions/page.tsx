import { Page } from "../components/page";
import { listActions } from "./actions";
import { ActionDelete } from "./components/action-delete";
import { CreateActionForm } from "./components/create-action-form.component";

const ActionsPage = async () => {
  const actions = await listActions();

  return (
    <Page>
      <section>
        <h1>Actions</h1>
        <p>Here you can find and manager all your stored actions</p>

        <section className="mb-2">
          <CreateActionForm />
        </section>

        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Action name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actions?.map((action, i) => (
              <tr key={action.name}>
                <td>{i + 1}</td>
                <td>{action.name}</td>
                <td>
                  <ActionDelete name={action.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Page>
  );
};

export default ActionsPage;
