import React, { useState, useEffect } from "react";
import Tampa from "../../assets/tampa.jpg";
import { Form, Container, Row, Col } from "react-bootstrap";

import api from "../../services/api";

import Header from "../../components/header";

export default function Dashboard() {
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await api.get("/products");

        setProducts(response.data.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }

    getProducts();
  }, []);

  if (error) {
    return <h1 className="bg-black">Error</h1>;
  }

  return (
    <>
      <Header></Header>

      <div className="bg-blue pt-5 pb-5">
        <Container>
          <h1 className="text-white mt-4">Conheça seu modelo</h1>
        </Container>
      </div>

      <Container>
        <Row>
          {products.map((product) => (
            <Col key={product.id} className="text-center" md={3}>
              <img className="img-fluid" src={Tampa} alt="" />
              <div>{product.name}</div>
              R$ 100,00
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
