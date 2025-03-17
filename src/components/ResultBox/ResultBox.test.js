import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency.js';
import '@testing-library/jest-dom/extend-expect';


describe('Component ResultBox', () => {
    
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    it('should render proper info about conversion when PLN -> USD', () => {
        const testCases = [
            { amount: 100, from: 'PLN', to: 'USD', output: 'PLN 100.00 = $28.57' },
            { amount: 200, from: 'PLN', to: 'USD', output: 'PLN 200.00 = $57.14' },
            { amount: 345, from: 'PLN', to: 'USD', output: 'PLN 345.00 = $98.57' },
        ];
        for (const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.output);
            cleanup();
        }
    });

    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: 100, from: 'PLN', to: 'USD', output: 'PLN 100.00 = $28.57' },
            { amount: 200, from: 'PLN', to: 'USD', output: 'PLN 200.00 = $57.14' },
            { amount: 345, from: 'PLN', to: 'USD', output: 'PLN 345.00 = $98.57' },
        ];
        for (const testObj of testCases) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(testObj.output);
            cleanup();
        }
    });

    it('should have same value if conversion type USD-USD', () => {
        const testCase = {
            amount: 123,
            from: 'USD',
            to: 'USD',
        }
        render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
        const output = screen.getByTestId('output')
        const expectedResult = formatAmountInCurrency(testCase.amount, testCase.from)
        expect(output).toHaveTextContent(`${expectedResult} = ${expectedResult}`);
        cleanup()
    });

    it('should have same value if conversion type PLN-PLN', () => {
        const testCase = {
            amount: 123,
            from: 'PLN',
            to: 'PLN',
        }
        render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
        const output = screen.getByTestId('output')
        const expectedResult = formatAmountInCurrency(testCase.amount, testCase.from)
        expect(output).toHaveTextContent(`${expectedResult} = ${expectedResult}`);
        cleanup()
    });

    it('should return error when intital value is negative', () => {
        const testCase = {
            amount: -123,
            from: 'PLN',
            to: 'USD',
        }
        render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
        const output = screen.getByTestId('output')
        expect(output).toHaveTextContent(`Wrong value!`);
        cleanup()
    });
});