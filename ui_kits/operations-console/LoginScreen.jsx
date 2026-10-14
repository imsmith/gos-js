/* LoginScreen.jsx — the auth gate. Terse, operational, centered. Any non-empty
 * key authenticates (mock).
 */
const { Card, Fieldset, Input, Button, Mark, StatusBadge, Freshness } = window.DesignSystem_019de4;

function LoginScreen({ onAuth }) {
  const [op, setOp] = React.useState("ops.kestrel");
  const [key, setKey] = React.useState("");
  const submit = (e) => { e.preventDefault(); if (key.trim()) onAuth(); };
  return (
    <div className="ops-center">
      <Card className="ops-login" title={<><Mark name="m-settings" size={16} /> GRID·OPS</>} density="comfortable"
            footer={<div className="ops-row"><StatusBadge step="low" label="GRID NOMINAL" variant="plain" size={13} /><Freshness state="live" at="02:14Z" /></div>}>
        <form onSubmit={submit} className="ops-stack">
          <Fieldset legend="Operator authentication" hint="Access is logged.">
            <Input label="Operator" value={op} onChange={(e) => setOp(e.target.value)} icon="m-user" />
            <Input label="Access key" type="password" value={key} onChange={(e) => setKey(e.target.value)} icon="m-lock" placeholder="••••••••" helper="Any non-empty key (mock)." />
          </Fieldset>
          <Button variant="primary" size="lg" icon="m-upload" type="submit">Engage</Button>
        </form>
      </Card>
    </div>
  );
}

Object.assign(window, { LoginScreen });
