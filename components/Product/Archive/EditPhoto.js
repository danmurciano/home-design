import React from "react";
import { Form, Input, TextArea, Button, Image, Message, Header, Icon, Modal} from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";



function EditPhoto({ productId, mediaUrl, setPhotoModal }) {

  let originalProduct = {
      key: productId,
      mediaUrl: mediaUrl,
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


  function handleChange(event) {
    const { name, value, files } = event.target;
      setProduct(prevState => ({ ...prevState, mediaUrl: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));

    }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", product.mediaUrl);
    data.append("upload_preset", "reactreserve");
    data.append("cloud_name", "danmurciano");
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
      const payload = { key, mediaUrl };
      const response = await axios.put(url, payload);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
      // setTimeout(setEditModal(false), 5000);
    }
  }

  return (
    <>
      <Header as="h2">
        Edit Photo
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
          control={Input}
          name="mediaUrl"
          type="file"
          accept="image/*"
          content="Select Image"
          onChange={handleChange}
        />
        <Image src={product.mediaUrl} rounded centered size="small" />
        <Button
        onClick={() => setPhotoModal(false)}
        icon="cancel"
        labelPosition="right"
        content="Cancel"
        />
        <Button
          color="blue"
          icon="check"
          labelPosition="right"
          content="Save"
          onClick={handleSubmit}
        />
      </Form>
    </>
  );
}

export default EditPhoto;
