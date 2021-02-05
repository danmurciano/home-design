import React from "react";
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from "semantic-ui-react";
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import axios from "axios";
import cookie from "js-cookie";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";


const INITIAL_PRODUCT = {
  name: "",
  price: "",
  category: "Other",
  shortDesc: "",
  description: "",
  status: "In Stock",
  media: ""
};

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {setOpen(false)};
  const handleOpen = () => {setOpen(true)};


  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);


  React.useEffect(() => {
    let timeout;

    if (success) {
      setTimeout(function() {
        setTimeout(function() { () => setSuccess(false)}, 100)
        location.reload()
      }, 500)
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success])


  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", product.media);
    data.append("upload_preset", "homedesign");
    data.append("cloud_name", process.env.CLOUDINARY_CLOUD);
    data.append("folder", process.env.CLOUDINARY_FOLDER);
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }


  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setError("");
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      product.price = parseFloat(product.price);
      const { name, price, category, shortDesc, description, status } = product;
      const tokenAdmin = cookie.get("tokenAdmin");
      const payload = {
        params: { name, price, category, shortDesc, description, status, mediaUrl },
        headers: { Authorization: tokenAdmin }
      }
      const response = await axios.post(url, payload);
      // setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message error header="Oops!" content={error} />
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been created"
        />
        <Form.Group>
          <Form.Field
            control={Input}
            width="7"
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
            disabled={success}
          />
          <Form.Field
            control={Input}
            width="3"
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
            disabled={success}
          />

          <Form.Field
            control={Input}
            width="3"
            name="category"
            label="Category"
            disabled={success}
          >
            <FormControl >
              <Select
                native
                labelId="category-label"
                id="category"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                name="category"
                value={product.category}
                onChange={handleChange}
                menuProps
              >
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Lighting">Lighting</option>
              <option value="Textiles & Rugs">Textiles & Rugs</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>
        </Form.Field>

        <Form.Field
          control={Input}
          width="3"
          name="status"
          label="Status"
          disabled={success}
        >
          <FormControl >
            <Select
              native
              labelId="status-label"
              id="status"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              name="status"
              value={product.status}
              onChange={handleChange}
              menuProps
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </Select>
          </FormControl>
        </Form.Field>
      </Form.Group>

      <Form.Group>
        <Form.Field
          control={Input}
          width="7"
          name="shortDesc"
          label="Short Description"
          placeholder="Short Description"
          value={product.shortDesc}
          onChange={handleChange}
          disabled={success}
        />

        <Form.Field
          control={Input}
          width="5"
          name="media"
          type="file"
          label="Media"
          accept="image/*"
          content="Select Image"
          onChange={handleChange}
          disabled={success}
        />
        <Image src={mediaPreview} centered size="tiny" />
      </Form.Group>

        <Form.Field
          control={TextArea}
          rows="12"
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
          disabled={success}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading || success}
          fluid
          size="big"
          color="instagram"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />

      </Form>
    </>
  );
}
