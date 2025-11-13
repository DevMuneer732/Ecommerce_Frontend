
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '../../components/ui/dialog'; 
import { Button } from '../../components/ui/button'; 

interface OrderSuccessDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const OrderSuccessDialog: React.FC<OrderSuccessDialogProps> = ({ isOpen, onOpenChange }) => {
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        onOpenChange(false); 
        navigate('/');
    };

    const handleViewOrders = () => {
        onOpenChange(false); 
        navigate('/my-orders'); 
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-md"
                onInteractOutside={(e) => e.preventDefault()} // Bahar click karne se band na ho
            >
                <DialogHeader className="items-center text-center">
                    <CheckCircleIcon className="h-20 w-20 text-green-500" />
                    <DialogTitle className="text-2xl font-bold pt-4">
                        Order Placed Successfully!
                    </DialogTitle>
                    <DialogDescription className="pt-2">
                        Thank you for your purchase. Your order is being processed.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="grid grid-cols-2 gap-4 pt-4">
                    <Button variant="outline" onClick={handleContinueShopping}>
                        Continue Shopping
                    </Button>
                    <Button onClick={handleViewOrders}>
                        View My Orders
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};