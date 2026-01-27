import { expect } from '@jest/globals';

describe('AlunoTest', () => {
    test("test_smell_021", () => {
        const historico: ItemDeHistorico[] = aluno.getHistorico();
        expect(historico).not.toBeNull();
        for (let i = 0; i < historico.length; i++) {
            expect(historico[i]).toBeNull();
        }
        expect(aluno.getQuantDisciplinasCursadas()).toBe(0);

        // o aluno vai cursar a primeira disciplina
        aluno.registrarConclusaoDisciplina(disciplina1, 6.5, 2019, 2);

        historico = aluno.getHistorico();
        const primeiroItem: ItemDeHistoricoDisciplinaCursada = historico[0] as ItemDeHistoricoDisciplinaCursada;
        expect(primeiroItem.getDisciplina().getCodigo()).toBe("MAB001");
        expect(primeiroItem.getAno()).toBe(2019);
        expect(primeiroItem.getSemestre()).toBe(2);
        verificarAtualizacaoCreditos(1, 6.5, 4);

        aluno.registrarConclusaoDisciplina(disciplina2, 8, 2020, 1);
        // verificar todas as disciplinas do histórico até aqui
        historico = aluno.getHistorico();
        expect(primeiroItem.getDisciplina().getCodigo()).toBe("MAB001");
        const segundoItem: ItemDeHistoricoDisciplinaCursada = historico[1] as ItemDeHistoricoDisciplinaCursada;
        expect(segundoItem.getDisciplina().getCodigo()).toBe("MAB002");
        verificarAtualizacaoCreditos(2, 7.4, 10);

        // o aluno vai cursar a terceira disciplina
        aluno.registrarConclusaoDisciplina(disciplina3, 10, 2020, 1);

        historico = aluno.getHistorico();
        expect(primeiroItem.getDisciplina().getCodigo()).toBe("MAB001");
        expect(segundoItem.getDisciplina().getCodigo()).toBe("MAB002");
        const terceiroItem: ItemDeHistoricoDisciplinaCursada = historico[2] as ItemDeHistoricoDisciplinaCursada;
        expect(terceiroItem.getDisciplina().getCodigo()).toBe("MAJ003");
        verificarAtualizacaoCreditos(3, 8.375, 16);
    });
});