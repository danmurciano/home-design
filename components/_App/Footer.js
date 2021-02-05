export default function Footer() {
  let date = new Date();

  return (
    <div class="footer">
      <p> {`© All Rights Reserved Home Design ${date.getFullYear()}`} </p>
    </div>
  );
}
