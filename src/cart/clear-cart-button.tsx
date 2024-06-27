'use client';

import {
  AlertModal,
  AlertModalBody,
  AlertModalFooter,
  AlertModalTitle,
  AlertModalTrigger,
} from '@/common/alert-modal';
import { Button } from '@/common/button';
import type { Maybe } from '@/common/common-types';
import { SubmitButton } from '@/forms/submit-button';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { clearCart } from './cart-actions';
import type { CartDetails } from './cart-types';

type ClearCartButtonProps = { cart: Maybe<CartDetails> };

export function ClearCartButton({ cart }: ClearCartButtonProps) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [state, formAction] = useFormState(clearCart, null);
  const { success } = state ?? {};

  useEffect(() => {
    if (success) {
      setIsAlertModalOpen(false);
    }
  }, [success]);

  if (!cart) {
    return null;
  }

  return (
    <AlertModal
      trigger={
        <AlertModalTrigger asChild>
          <Button className="w-full">Vider le panier</Button>
        </AlertModalTrigger>
      }
      isOpen={isAlertModalOpen}
      onIsOpenChange={setIsAlertModalOpen}
    >
      <AlertModalTitle>Vider le panier?</AlertModalTitle>
      <AlertModalBody>Êtes-vous sûr de vouloir vider votre panier ?</AlertModalBody>
      <AlertModalFooter>
        <form action={formAction}>
          <SubmitButton variant="primary">Vider</SubmitButton>
        </form>
      </AlertModalFooter>
    </AlertModal>
  );
}
