import { Form, FormGroup, Label, Input, Button} from "reactstrap";
import Select from 'react-select';

function TapeForm({ genreList }) {

  return (
     <Form id="tapeForm">
    <FormGroup floating>
      <Input
        id="tapeTitle"
        name="title"
        placeholder="Title"
        type="text"
      />
      <Label for="tapeTitle">
        Title
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>
     <Select
    isMulti
    name="colors"
    options={genreList.map((genre) => ({value: genre.name, label: genre.name}))}
    className="basic-multi-select"
    classNamePrefix="select"
  />
    {console.log({})}
    {' '}
    <Button>
      Submit
    </Button>
  </Form>
  );
}

export default TapeForm;
