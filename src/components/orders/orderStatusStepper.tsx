import React from 'react';
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';

const steps = [
    { name: 'Processing', icon: Package },
    { name: 'Shipped', icon: Truck },
    { name: 'Delivered', icon: CheckCircle },
];

const Step: React.FC<{
    icon: React.ElementType;
    title: string;
    isCompleted: boolean;
    isCurrent: boolean;
}> = ({ icon: Icon, title, isCompleted, isCurrent }) => {

    let circleClass = 'bg-gray-300'; // Pending
    if (isCurrent) circleClass = 'bg-sky-600 animate-pulse';
    if (isCompleted) circleClass = 'bg-green-600';

    let textClass = 'text-gray-500'; // Pending
    if (isCurrent) textClass = 'text-sky-600 font-semibold';
    if (isCompleted) textClass = 'text-green-600 font-semibold';

    return (
        <div className="flex flex-col items-center">
            <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors ${circleClass}`}
            >
                <Icon className="w-6 h-6" />
            </div>
            <p className={`mt-2 text-sm font-medium ${textClass}`}>{title}</p>
        </div>
    );
};

export const OrderStatusStepper: React.FC<{ status: string }> = ({ status }) => {
    const currentStatus = status.toLowerCase();

    // Agar order cancelled hai
    if (currentStatus === 'cancelled') {
        return (
            <div className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg">
                <XCircle className="w-8 h-8 text-red-600 mr-3" />
                <div>
                    <h3 className="text-lg font-semibold text-red-800">Order Cancelled</h3>
                    <p className="text-sm text-red-600">This order has been cancelled.</p>
                </div>
            </div>
        );
    }

    // Active step find karein
    let activeStep = steps.findIndex(step => step.name.toLowerCase() === currentStatus);
    if (activeStep === -1) activeStep = 0; // Default to 'Processing'

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={step.name}>
                        <Step
                            icon={step.icon}
                            title={step.name}
                            isCompleted={index < activeStep}
                            isCurrent={index === activeStep}
                        />
                        {/* Connecting Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-1 mt-6 mx-4 rounded-full ${index < activeStep ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};