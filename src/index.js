import { createRoot } from 'react-dom/client';
import { formatDistanceToNow } from 'date-fns';

import './index.css'
import NewTaskForm from './components/new-task-form.js';
import TaskList from './components/task-list.js';
import Footer from './components/footer.js';

const Header = () => {
  return (
    <header className="header">
        <h1>todos</h1>
        <NewTaskForm /> 
      </header>
  )
}

const Main = ({data}) => {
  return (
    <section className='main'>
      <TaskList data={data} />
      <Footer />
    </section>
  )
}



const App = () => {
  return (
    <section className="todoapp">
      <Header />
      <Main data={data}/>
    </section>
  );
}

const data = [
  { text: 'Completed task', className: 'completed', created: formatDistanceToNow(new Date()) },
  { text: 'Editing task', className: 'editing', created: formatDistanceToNow(new Date()) },
  { text: 'Active task', className: '', created: formatDistanceToNow(new Date()) }
]

const root = createRoot(document.getElementById('root'));
root.render(<App />)


