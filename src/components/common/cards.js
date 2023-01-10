import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import moment from "moment";

function Cards() {
  const { profileDetail, loading } = useSelector(
    (state) => state.getProfileDetail
  );

  return (
    <Row xs={1} sm={1} md={2} lg={2} className="g-4">
      {profileDetail?.data?.children?.length > 0
        ? profileDetail?.data?.children?.map((item, idx) => (
            <Col>
              <Card
                bg="light"
                key={idx}
                text="dark"
                style={{ width: "18rem" }}
                className="mb-2"
              >
                <Card.Header>
                  <div className="d-flex justify-content-between">
                    <h6 className="ellipse">{item.childName}</h6>
                    <div>
                      <i class="fa fa-thumb-tack" aria-hidden="true"></i>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex  justify-content-start align-items-end">
                    <div>
                      <i class="fa fa-location-arrow" aria-hidden="true"></i>
                    </div>
                    <div className="mx-2 ellipse">
                      {item.address}
                      {/* <h6 className="ellipse">
                        {item?.skillLevel === 1
                          ? "Begginer"
                          : item?.skillLevel === 2
                          ? "Intermidate"
                          : "Expert"}
                      </h6> */}
                    </div>
                  </div>
                  <div className="d-flex justify-content-start align-items-end">
                    <div>
                      <i class="fa fa-signal" aria-hidden="true"></i>
                    </div>
                    <div className="mx-2 ellipse">
                      {item?.skillLevel === 1
                        ? "Begginer"
                        : item?.skillLevel === 2
                        ? "Intermidate"
                        : "Expert"}
                    </div>
                  </div>
                  <div className="d-flex justify-content-start align-items-end">
                    <div>
                      <i class="fa fa-birthday-cake" aria-hidden="true"></i>
                    </div>
                    <div className="mx-2 ellipse">
                      {moment(item.dateOfBirth).format("YYYY-MM-DD")}
                    </div>
                  </div>
                  <div className="d-flex justify-content-start align-items-end">
                    <div>
                      <i class="fa fa-envelope-o" aria-hidden="true"></i>
                    </div>
                    <div className="mx-2 ellipse">{item.email}</div>
                  </div>

                  {/* <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))
        : loading && (
            <div className="w-100 d-flex justify-content-center align-items-center">
              <div class="spinner-border  text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          )}
    </Row>
  );
}

export default Cards;
