const { expect } = require('jest');

describe('AlunoTest', () => {
    it("test_smell_021", () => {
        let historico = aluno.getHistorico();
        expect(historico).not.toBeNull();
        for (let i = 0; i < historico.length; i++) {
            expect(historico[i]).toBeNull();
        }
        expect(aluno.getQuantDisciplinasCursadas()).toBe(0);

        aluno.registrarConclusaoDisciplina(disciplina1, 6.5, 2019, 2);

        historico = aluno.getHistorico();
        let primeiroItem = historico[0];
        expect(primeiroItem.getDisciplina().getCodigo()).toBe("MAB001");
        expect(primeiroItem.getAno()).toBe(2019);
        expect(primeiroItem.getSemestre()).toBe(2);
        verificarAtualizacaoCreditos(1, 6.5, 4);

        aluno.registrarConclusaoDisciplina(disciplina2, 8, 2020, 1);
        historico = aluno.getHistorico();
        expect(primeiroItem.getDisciplina().getCodigo()).toBe("MAB001");
        let segundoItem = historico[1];
        expect(segundoItem.getDisciplina().getCodigo()).toBe("MAB002");
        verificarAtualizacaoCreditos(2, 7.4, 10);

        aluno.registrarConclusaoDisciplina(disciplina3, 10, 2020, 1);

        historico = aluno.getHistorico();
        expect(primeiroItem.getDisciplina().getCodigo()).toBe("MAB001");
        expect(segundoItem.getDisciplina().getCodigo()).toBe("MAB002");
        let terceiroItem = historico[2];
        expect(terceiroItem.getDisciplina().getCodigo()).toBe("MAJ003");
        verificarAtualizacaoCreditos(3, 8.375, 16);
    });
});