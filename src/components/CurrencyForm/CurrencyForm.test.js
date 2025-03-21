import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';


describe('Component CurrencyForm', () => {
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => {}} />);
      });
    it('should run action callback with proper data on form submit', () => {
        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '20', from: 'USD', to: 'PLN' },
            { amount: '200', from: 'PLN', to: 'USD' },
            { amount: '345', from: 'USD', to: 'PLN' },
        ];
        for(const testObj of testCases) {
            const action = jest.fn();
        
            // render component
            render(<CurrencyForm action={action} />);
        
            // find fields elems
            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from-select');
            const toField = screen.getByTestId('to-select');
            const submitButton = screen.getByText('Convert');
        
            // set test values to fields
            userEvent.type(amountField, testObj.amount);
            userEvent.selectOptions(fromField, testObj.from);
            userEvent.selectOptions(toField, testObj.to);
            userEvent.click(submitButton);
        
            // check if action callback was called once and with proper argument
            expect(action).toHaveBeenCalledTimes(1);
            expect(action).toHaveBeenCalledWith({ amount: parseInt(testObj.amount), from: testObj.from, to: testObj.to });
        
            // unmount component
            cleanup()
        }
    });
});


