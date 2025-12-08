import { Form, FormGroup, Label, Input, Button} from "reactstrap";
import Select from 'react-select';
// import { getTapeById } from "../../managers/tapeManager";
// import { useParams } from "react-router-dom";
// import getGenres from "../../managers/genreManager";
// import { useEffect } from "react";

//NEED SOMETHING LIKE VALUE.LENGTH OR SOMETHING SIMILAR TO GET HOW MANY GENRES HAVE BEEN SELECTED, THAT WAY A FUNCTION CAN BE WRITTEN TO MAKE A NEW OBJECT EACH TIME A GENRE IS SELECTED. 
 

function TapeForm({ genreList }) {

// const { id } = useParams();
// const [genres, setGenres] = useState([]);
// const isEditMode = !!id;






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
