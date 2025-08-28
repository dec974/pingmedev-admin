import Alert from "./ui/components/Alert";
import Button from "./ui/components/Button";
import Card from "./ui/components/Card";
import Input from "./ui/components/Input";
import Select from "./ui/components/Select";
import Textarea from "./ui/components/Textarea";
function Dashboard() {

    return (
        <div>
            <div>
                <h2>Alertes</h2>
                <Alert type='info'>Info</Alert>
                <Alert type='warm'>warm</Alert>
                <Alert type={'success'}>Success</Alert>
                <Alert type={'error'}>Error</Alert>
            </div>
            <div>
                <h2>Button</h2>
                <Button type={'primary'}>Primary</Button>
                <Button type={'secondary'}>Secondary</Button>
                <Button type={'ternary'}>Ternary</Button>
                <Button type="ternary-alt">Ternary alt</Button>
            </div>
            <div> 
                <h2>Card</h2>
                <Card title="hello i am a card" tag={'javascript'}>
                    <p>je suis une card simple</p>
                    <Button type="ternary-alt">test</Button>
                </Card>
            </div>
            <div>
                <h2>Formulaire</h2>
                <Input label="Name" title="name" />
                <Select>
                    <option  value='javascript'>Javascript</option>
                    <option  value='php'>PHP</option>
                    <option  value='c++'>C++</option>
                </Select>
                <Textarea label='textarea' title='textarea' rows={5} />
            </div>
        </div>
    );
}

export default Dashboard;