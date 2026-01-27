using Xunit;

public class TestSmell021
{
    [Fact]
    public void GetConclusaoDisciplinaTest()
    {
        var historico = aluno.GetHistorico();
        Assert.NotNull(historico);
        for (int i = 0; i < historico.Count; i++)
        {
            Assert.Null(historico[i]);
        }
        Assert.Equal(0, aluno.GetQuantDisciplinasCursadas());

        // o aluno vai cursar a primeira disciplina
        aluno.RegistrarConclusaoDisciplina(disciplina1, 6.5f, 2019, 2);

        historico = aluno.GetHistorico();
        var primeiroItem = (ItemDeHistoricoDisciplinaCursada)historico[0];
        Assert.Equal("MAB001", primeiroItem.GetDisciplina().GetCodigo());
        Assert.Equal(2019, primeiroItem.GetAno());
        Assert.Equal(2, primeiroItem.GetSemestre());
        VerificarAtualizacaoCreditos(1, 6.5f, 4);

        aluno.RegistrarConclusaoDisciplina(disciplina2, 8, 2020, 1);
        // verificar todas as disciplinas do histórico até aqui
        historico = aluno.GetHistorico();
        Assert.Equal("MAB001", primeiroItem.GetDisciplina().GetCodigo());
        var segundoItem = (ItemDeHistoricoDisciplinaCursada)historico[1];
        Assert.Equal("MAB002", segundoItem.GetDisciplina().GetCodigo());
        VerificarAtualizacaoCreditos(2, 7.4f, 10);

        // o aluno vai cursar a terceira disciplina
        aluno.RegistrarConclusaoDisciplina(disciplina3, 10, 2020, 1);

        historico = aluno.GetHistorico();
        Assert.Equal("MAB001", primeiroItem.GetDisciplina().GetCodigo());
        Assert.Equal("MAB002", segundoItem.GetDisciplina().GetCodigo());
        var terceiroItem = (ItemDeHistoricoDisciplinaCursada)historico[2];
        Assert.Equal("MAJ003", terceiroItem.GetDisciplina().GetCodigo());
        VerificarAtualizacaoCreditos(3, 8.375f, 16);
    }

    private void VerificarAtualizacaoCreditos(int expectedCount, float expectedAverage, int expectedTotal)
    {
        // Implement the logic for credit verification here
    }
}