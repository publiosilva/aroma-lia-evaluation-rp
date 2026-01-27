// Original URL: https://github.com/vigusmao/Comp2_2020_PLE/blob/f38a995ff51ade221cdca4c6b72b98b88f13d9ef/Siguinha/src/testes/AlunoTest.java#L48-L84

public class TestSmell021 {
    @Test
    public void getConclusaoDiscipinaTest() {
        ArrayList<ItemDeHistorico> historico = aluno.getHistorico();
        assertNotNull(historico);
        for (int i = 0; i < historico.size(); i++) {
            assertNull(historico.get(i));
        }
        assertEquals(0, aluno.getQuantDisciplinasCursadas());

        // o aluno vai cursar a primeira disciplina
        aluno.registrarConclusaoDisciplina(disciplina1, 6.5f, 2019, 2);

        historico = aluno.getHistorico();
        ItemDeHistoricoDisciplinaCursada primeiroItem = (ItemDeHistoricoDisciplinaCursada) historico.get(0);
        assertEquals("MAB001", primeiroItem.getDisciplina().getCodigo());
        assertEquals(2019, primeiroItem.getAno());
        assertEquals(2, primeiroItem.getSemestre());
        verificarAtualizacaoCreditos(1, 6.5f, 4);

        aluno.registrarConclusaoDisciplina(disciplina2, 8, 2020, 1);
        // verificar todas as disciplinas do histórico até aqui
        historico = aluno.getHistorico();
        assertEquals("MAB001", primeiroItem.getDisciplina().getCodigo());
        ItemDeHistoricoDisciplinaCursada segundoItem = (ItemDeHistoricoDisciplinaCursada) historico.get(1);
        assertEquals("MAB002", segundoItem.getDisciplina().getCodigo());
        verificarAtualizacaoCreditos(2, 7.4f, 10);

        // o aluno vai cursar a terceira disciplina
        aluno.registrarConclusaoDisciplina(disciplina3, 10, 2020, 1);

        historico = aluno.getHistorico();
        assertEquals("MAB001", primeiroItem.getDisciplina().getCodigo());
        assertEquals("MAB002", segundoItem.getDisciplina().getCodigo());
        ItemDeHistoricoDisciplinaCursada terceiroItem = (ItemDeHistoricoDisciplinaCursada) historico.get(2);
        assertEquals("MAJ003", terceiroItem.getDisciplina().getCodigo());
        verificarAtualizacaoCreditos(3, 8.375f, 16);
    }
}
