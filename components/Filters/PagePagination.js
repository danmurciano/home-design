import { Container, Pagination } from "semantic-ui-react";

export default function PagePagination({ pageState, totalPages, handlePageSelect }) {

  return (
    <Container textAlign="center" style={{ margin: "2em" }}>
      <Pagination
        activePage={pageState}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={3}
        totalPages={totalPages}
        onPageChange={(event, data) => {handlePageSelect(data.activePage)}}
      />
    </Container>
  );
}
