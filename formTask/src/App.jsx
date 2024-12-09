import "./App.css";
// import { DefaultForm } from "./components/defaultForm";
import { ReactForm } from "./components/ReactForm";
function App() {
  const sendFormData = (formData) => {
    console.log(formData);
  };
  return (
    <>
      {/* <DefaultForm sendFormData={sendFormData} /> */}
      <ReactForm sendFormData={sendFormData} />
    </>
  );
}

export default App;
