export default function LoanInfoSection() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Welcome to the Loan Eligibility Predictor</h1>
      <p className="text-gray-600 mb-4">
        Our tool helps you quickly check your loan eligibility using basic financial details.
        Simply log in, provide some personal and income data, and our system will give you a
        prediction based on our trained machine learning model.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">What is a Loan?</h2>
      <p className="text-gray-600 mb-4">
        A loan is a sum of money borrowed from a financial institution that’s paid back with interest
        over time. Loan eligibility depends on factors like income, employment status, credit history,
        and loan amount requested.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Tips to Improve Eligibility</h2>
      <ul className="list-disc list-inside text-gray-600">
        <li>Maintain a good credit score</li>
        <li>Reduce existing debts</li>
        <li>Show stable and sufficient income</li>
        <li>Choose an appropriate loan amount and tenure</li>
      </ul>
    </section>
  );
}
