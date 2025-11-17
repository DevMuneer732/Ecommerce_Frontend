// src/components/orders/ShippingDetailsCard.tsx

import React from 'react';
import { Home, Phone, Mail } from 'lucide-react';
import { FullOrder } from '../../store/useOrderStore';

interface ShippingProps {
    shippingInfo: FullOrder['shippingInfo'];
}

export const ShippingDetailsCard: React.FC<ShippingProps> = ({ shippingInfo }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Shipping Details</h3>
            </div>
            <div className="p-5 space-y-4">
                <p className="text-sm font-semibold text-gray-800">{shippingInfo.fullname}</p>

                <div className="flex items-start text-sm text-gray-600">
                    <Home className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                    <span>{shippingInfo.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span>{shippingInfo.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span>{shippingInfo.email}</span>
                </div>
            </div>
        </div>
    );
};