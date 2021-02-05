import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import { Menu } from 'semantic-ui-react'
import baseUrl from "../../utils/baseUrl";


export default function AdminMenu() {
  const router = useRouter();

  return (
    <div class="admin-menu">
      <Menu tabular>
        <Menu.Item
         name="Products"
         href="/admin/products"
         active={router.pathname === "/admin/products"}
       />
       <Menu.Item
         name="Orders"
         href="/admin/orders"
         active={router.pathname === "/admin/orders"}
       />
     </Menu>
    </div>
  )
}
