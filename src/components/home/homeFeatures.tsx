
import React from 'react';
import { ShieldCheckIcon, TruckIcon, ArchiveBoxIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const featuresData = [
    {
        id: 1,
        icon: ShieldCheckIcon, 
        title: "Quality Assurance",
        description: "Tested & trusted",
    },
    {
        id: 2,
        icon: TruckIcon, 
        title: "Free Shipping",
        description: "Across the USA",
    },
    {
        id: 3,
        icon: ArchiveBoxIcon, 
        title: "Delivered with Care",
        description: "Securely packed",
    },
    {
        id: 4,
        icon: ChatBubbleBottomCenterTextIcon, 
        title: "Excellent Service",
        description: "Customer-first",
    },
];

export const HomeFeatures: React.FC = () => {
    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {featuresData.map((feature) => (
                    <div
                        key={feature.id}
                        className="bg-white p-6 flex justify-center items-center flex-col rounded-xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-lg"
                    >
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-500/10 mb-4">
                            <feature.icon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {feature.title}
                        </h3>
                        <p className="text-base text-gray-500">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};