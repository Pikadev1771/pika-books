import React from 'react';
import { styled } from 'styled-components';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const CartItem = ({
  bookData,
  checkedItemIds,
  handleCheckChange,
  handleQuantityChange,
  handleDelete,
  quantity,
}) => {
  const navigate = useNavigate();

  return (
    <CartItemBox>
      <ItemSummary>
        <CheckboxContainer>
          <CheckBox
            type="checkbox"
            checked={checkedItemIds.indexOf(bookData.id) !== -1 ? true : false}
            onChange={(e) => {
              handleCheckChange(bookData.id, e.target.checked);
            }}
          />
        </CheckboxContainer>
        <Thumbnail onClick={() => navigate(`/book/${bookData.id}`)}>
          <img
            src={bookData.bookImgUrl || '/books/Book.png'}
            width={120}
            height={150}
            alt={bookData.title}
          />
        </Thumbnail>
        <ItemInfo onClick={() => navigate(`/book/${bookData.id}`)}>
          <BookTitle>{bookData.title}</BookTitle>
          <BookPrice>{bookData.price.toLocaleString()}원</BookPrice>
        </ItemInfo>
      </ItemSummary>
      <ItemAdjustment>
        <PriceAndQuantity>
          <ItemTotalPrice>
            {(bookData.price * quantity).toLocaleString()}원
          </ItemTotalPrice>
          <Quantity
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              handleQuantityChange(bookData.id, Number(e.target.value))
            }
          />
        </PriceAndQuantity>
        <DeleteBtn onClick={() => handleDelete(bookData.id)}>
          <DeleteIcon
            sx={{
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              padding: '12px',
              color: 'black',
            }}
          />
        </DeleteBtn>
      </ItemAdjustment>
    </CartItemBox>
  );
};

const CartItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 4px solid black;
  padding: 20px;
  margin-bottom: 20px;
  height: 250px;
`;

const ItemSummary = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxContainer = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

const Thumbnail = styled.div`
  margin-right: 20px;

  :hover {
    cursor: pointer;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  :hover {
    cursor: pointer;
  }
`;

const BookTitle = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  line-height: 1.4;

  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const BookPrice = styled.span`
  font-size: 20px;
`;

const ItemAdjustment = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

const PriceAndQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemTotalPrice = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Quantity = styled.input`
  width: 100px;
  height: 40px;
  font-size: 20px;
  padding: 10px;
  text-align: center;
  border: 4px solid black;
  outline: none;

  :focus {
    outline: none;
  }
`;

const DeleteBtn = styled(Button)`
  width: 60px;
  height: 60px;
  margin-left: 12px;
`;

export default React.memo(CartItem);
