import React from "react";
import { Form, Input, TextArea, Button, Image, Message, Header, Icon, Modal} from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";


function EditDescription({ productId, name, price, description, mediaUrl, setDescriptionModal }) {

  let originalProduct = {
      key: productId,
      name: name,
      price: price,
      description: description,
      mediaUrl: mediaUrl
    }

  const [product, setProduct] = React.useState(originalProduct);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [productId]);

  React.useEffect(() => {
    let timeout;

    if (success) {
      setTimeout(function() {
        setTimeout(function() { () => setSuccess(false)}, 100)
        location.reload()
      }, 1500)
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [success])


  function handleChange(event) {
    const { name, value } = event.target;
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit(event) {
      try {
        event.preventDefault();
        setLoading(true);
        setError("");
        const url = `${baseUrl}/api/product`;
        const { key, name, price, description, mediaUrl } = product;
        const payload = { key, name, price, description, mediaUrl };
        const response = await axios.put(url, payload);
        setSuccess(true);
      } catch (error) {
        catchErrors(error, setError);
      } finally {
        setLoading(false);
      }
    }

  return (
    <>
      <Header as="h2">
        Edit Description
      </Header>
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
          content="Product has been updated"
        />
        <Form.Field
          control={TextArea}
          name="description"
          style={{ height: 200 }}
          value={product.description}
          onChange={handleChange}
          disabled={success}
        />
        <Button
        onClick={() => setDescriptionModal(false)}
        icon="cancel"
        labelPosition="right"
        content="Cancel"
        disabled={success}
        />
        <Button
          color="blue"
          icon="check"
          labelPosition="right"
          content="Save"
          onClick={handleSubmit}
          disabled={success}
        />
      </Form>
    </>
  );
}

export default EditDescription;
