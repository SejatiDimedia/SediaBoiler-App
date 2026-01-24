import { ComponentForm } from '../../components/ComponentForm';

export default function NewTemplatePage() {
    return (
        <ComponentForm
            mode="create"
            entityName="Template"
            redirectBaseUrl="/admin/templates"
            fixedCategory="landing-page"
        />
    );
}
