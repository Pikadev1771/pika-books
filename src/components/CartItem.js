import React from 'react';
import { styled } from 'styled-components';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({
  item,
  checkedItems,
  handleCheckChange,
  handleQuantityChange,
  handleDelete,
  quantity,
}) => {
  return (
    <CartItemBox>
      <ItemSummary>
        <CheckBox type="checkbox" />
        <Thumbnail>
          <img src={'/books/Book.png'} width={120} height={150} alt={''} />
        </Thumbnail>
        <ItemInfo>
          <BookTitle>사계절 책</BookTitle>
          <BookPrice>15000 원</BookPrice>
        </ItemInfo>
      </ItemSummary>
      <ItemAdjustment>
        <PriceAndQuantity>
          <ItemTotalPrice>30000원</ItemTotalPrice>
          <Quantity type="number" min={1} value={1} />
        </PriceAndQuantity>
        <DeleteBtn>
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

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`;

const Thumbnail = styled.div`
  margin-right: 20px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const BookTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const BookPrice = styled.span`
  font-size: 20px;
`;

const ItemAdjustment = styled.div`
  display: flex;
  align-items: center;
`;

const PriceAndQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemTotalPrice = styled.div`
  font-size: 24px;
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

export default CartItem;
