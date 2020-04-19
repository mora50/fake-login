import React, { useState, useEffect } from "react";
import Tampa from "../../assets/tampa.jpg";
import { Container, Row, Col, Button, Collapse } from "react-bootstrap";
import { ButtonBlue } from "./style";

import api from "../../services/api";

import Header from "../../components/header";

export default function Dashboard() {
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [shopCart, setShopCart] = useState([]);
  const [open, setOpen] = useState(false);

  function listCart(list) {
    const listProduct = list;

    setShopCart([...shopCart, listProduct]);
  }

  function removeProductChart(productId) {
    setShopCart(shopCart.filter(({ id }) => id !== productId));
  }

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
        <div className="justify-content-end my-4">
          <div className="text-right">
            <Button
              onClick={() => setOpen(!open)}
              className="bg-blue"
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Carrinho
            </Button>
          </div>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <div className="d-flex flex-wrap">
                {shopCart.map((product) => (
                  <Col key={product.id} className="text-center" md={3}>
                    <img className="img-fluid" src={Tampa} alt="" />
                    <div>{product.name}</div>
                    R$ 100,00 <br />
                    <ButtonBlue
                      className="rounded-pill p-2 my-3"
                      onClick={() => removeProductChart(product.id)}
                    >
                      Remove este item
                    </ButtonBlue>
                  </Col>
                ))}
              </div>
            </div>
          </Collapse>
        </div>

        <Row>
          {products.map((product) => (
            <Col key={product.id} className="text-center" md={3}>
              <img className="img-fluid" src={Tampa} alt="" />
              <div>{product.name}</div>
              R$ 100,00 <br />
              <ButtonBlue
                className="rounded-pill p-2 my-3"
                onClick={() => listCart(product)}
              >
                Adicionar ao carrinho
              </ButtonBlue>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
