import React from "react";

function ErrorElement({ error }) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-lg text-center max-w-md mx-auto">
                <h1 className="text-3xl md:text-4xl mb-4 text-red-600">
                    حدث خطأ
                </h1>
                <p className="text-lg mb-4 text-gray-700">
                    لم يتمكن الموقع من تحميل الصفحة بسبب خطأ غير متوقع.
                </p>
                {error && (
                    <div className="text-left bg-red-100 p-4 mb-4 rounded-md">
                        <h2 className="text-xl text-red-600 font-semibold">
                            تفاصيل الخطأ
                        </h2>
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                            {error.toString()}
                        </pre>
                    </div>
                )}
                <p className="text-lg">
                    الرجوع الى{" "}
                    <a className="text-blue-600 hover:underline" href="/">
                        الصفحة الرئيسية
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

export default ErrorElement;
