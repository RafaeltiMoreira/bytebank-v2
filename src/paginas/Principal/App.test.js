import { render, screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AppRoutes from '../../routes';

describe('Componente <App/>', () => {
  test('Deve permitir adicionar uma transação em Extrato', () => {
    render(<App />, { wrapper: BrowserRouter });

    const campoValor = screen.getByPlaceholderText('Digite um valor');
    const botao = screen.getByRole('button');
    const select = screen.getByRole('combobox');

    userEvent.selectOptions(select, ['Depósito']);
    useEvent.type(campoValor, '100');
    useEvent.click(botao);

    const novaTransacao = screen.getByTestId('lista-transacoes');
    const itemExtrato = screen.getByRole('listitem');

    expect(novaTransacao).toContainElement(itemExtrato);
  });

  test('Deve navegar até a página correspondente ao item clicado', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaCartoes = screen.getByText('Cartões');
    expect(linkPaginaCartoes).toBeInTheDocument();

    useEvent.click(linkPaginaCartoes);

    const tituloPaginaCartoes = await screen.findByText('Meus cartões');
    expect(tituloPaginaCartoes).toBeInTheDocument();
  });

  test('Deve navegar até a página correspondente ao link clicado', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaInvestimentos = screen.getByText('Investimentos');
    expect(linkPaginaInvestimentos).toBeInTheDocument();

    userEvent.click(linkPaginaInvestimentos);

    const tituloPaginaInvestimentos = await screen.findByText('Renda Fixa');
    expect(tituloPaginaInvestimentos).toBeInTheDocument();
  });
});
