import React from "react";
import { Link } from "react-router-dom";
import Ratio from "react-ratio";
import moment from "moment";

import { HeartButton, TYPE } from "../SaveButton";
import LoadingSpinner from "../LoadingSpinner";

import formatDesigners from "../../utils/formatDesigners";
import formatPrice from "../../utils/formatPrice";
import formatSize from "../../utils/formatSize";
import { useImage } from "../../hooks";
import {
  Container,
  ThumbnailContainer,
  InfoContainer,
  TopContainer,
  InnerContainer,
  Designers,
  Name,
  SecondaryContainer,
  Price,
  Size,
  StyledIcon,
  HorizontalContainer
} from "./StyledComponents";

export const ItemCardImage = ({ imageId }) => {
  const [imageURL, error] = useImage(imageId);
  const isLoading = imageURL === null;

  return (
    <ThumbnailContainer>
      {error ? (
        <StyledIcon icon="image" />
      ) : isLoading ? (
        <LoadingSpinner size={7} delay={500} />
      ) : (
        <img src={imageURL} alt="" />
      )}
    </ThumbnailContainer>
  );
};

export const ItemCard = ({ item, ...rest }) => {
  const { id, name, price, designers, size } = item;

  const formattedDesigners = formatDesigners(designers);
  const formattedPrice = formatPrice(price);
  const formattedSize = formatSize(size);

  return (
    <Ratio ratio={2 / 3}>
      <Container {...rest}>
        <Link to={`/i/${id}`}>
          <ItemCardImage imageId={item.attachments[0]} />

          <InfoContainer>
            <TopContainer>
              <InnerContainer>
                <Designers title={formattedDesigners}>
                  {formattedDesigners}
                </Designers>
                <Name title={name}>{name}</Name>
              </InnerContainer>
              <HeartButton id={id} type={TYPE.ITEM} scale={2} />
            </TopContainer>
            <SecondaryContainer>
              <Price title={price ? `Cena: ${price}` : null}>
                {formattedPrice}
              </Price>
              <Size title={size ? `Rozmiar: ${formattedSize}` : null}>
                {formattedSize}
              </Size>
            </SecondaryContainer>
          </InfoContainer>
        </Link>
      </Container>
    </Ratio>
  );
};

export const ItemCardHorizontal = ({ item, ...rest }) => {
  const {
    id,
    name,
    price,
    designers,
    category,
    createdAt,
    description
  } = item;

  const formattedDesigners = formatDesigners(designers)
  const formattedPrice = formatPrice(price)
  const formattedDescription = description.slice(0, 150) + "..."

  return (
    <HorizontalContainer>
      <Link to={`/i/${id}`}>
        <div className="info-container">
          <div className="top-container">
            <div className="category">{category}</div>
            <div className="designers">{formattedDesigners}</div>
          </div>
          <div className="name">{name}</div>
          <div className="createdAt">
            Dodano {moment(createdAt).format("D.M.YY o HH:mm")}
          </div>
          <div className="description">{formattedDescription}</div>
          <div className="bottom-container">
            <div className="price">{formattedPrice}</div>
            <div className="like-button">
              <HeartButton id={id} type={TYPE.ITEM} scale={1.5} />
            </div>
          </div>
        </div>
        <div className="image-container">
          <ItemCardImage imageId={item.attachments[0]} />
        </div>
      </Link>
    </HorizontalContainer>
  );
};

export default ItemCard;
