import pytest

class TestAluno:
    def test_smell_021(self):
        historico = aluno.get_historico()
        assert historico is not None
        for i in range(len(historico)):
            assert historico[i] is None
        assert aluno.get_quant_disciplinas_cursadas() == 0

        aluno.registrar_conclusao_disciplina(disciplina1, 6.5, 2019, 2)

        historico = aluno.get_historico()
        primeiro_item = historico[0]
        assert primeiro_item.get_disciplina().get_codigo() == "MAB001"
        assert primeiro_item.get_ano() == 2019
        assert primeiro_item.get_semestre() == 2
        self.verificar_atualizacao_creditos(1, 6.5, 4)

        aluno.registrar_conclusao_disciplina(disciplina2, 8, 2020, 1)
        historico = aluno.get_historico()
        assert primeiro_item.get_disciplina().get_codigo() == "MAB001"
        segundo_item = historico[1]
        assert segundo_item.get_disciplina().get_codigo() == "MAB002"
        self.verificar_atualizacao_creditos(2, 7.4, 10)

        aluno.registrar_conclusao_disciplina(disciplina3, 10, 2020, 1)

        historico = aluno.get_historico()
        assert primeiro_item.get_disciplina().get_codigo() == "MAB001"
        assert segundo_item.get_disciplina().get_codigo() == "MAB002"
        terceiro_item = historico[2]
        assert terceiro_item.get_disciplina().get_codigo() == "MAJ003"
        self.verificar_atualizacao_creditos(3, 8.375, 16)

    def verificar_atualizacao_creditos(self, arg1, arg2, arg3):
        pass