//[id, nome, empresa, idGestor, cargo]
var baseUsers = [
[4441, "Raphael Di Mello João", "Web Prêmios", 4361, "Diretor de Novos Negócios"]
, [5711, "Gislaine Francis Moreira", "Web Prêmios", 4441, "Diretora de Novas Contas"]
, [5891, "Tatiana Mendes Moura", "VTG", 4441, "Diretora de Negócios"]
, [4541, "Cinthya Ayume Hamada", "Web Prêmios", 5711, "Executiva de Contas Senior"]
, [3951, "Patricia Mafra Barbosa", "Web Prêmios", 5711, "Executiva de Contas Senior"]
, [4221, "Stella Tomanik", "Web Prêmios", 5711, "Executiva de Contas Senior"]
, [6241, "Pamela Guarnieri Wakabayashi", "Web Prêmios", 5711, "Executiva de Contas Pleno"]
, [6381, "Mariana de Oliveira Monteiro", "Web Prêmios", 5891, "Gerente de Ativação e Rentabilidade"]
, [6101, "Renato Dimitrov Muniz Pimenta", "Vantagens", 5891, "Gerente de Marketing"]
, [3871, "Marilia Pereira da Silva Hopp", "VTG", 5891, "Executiva de Contas Pleno"]
, [4811, "Bruno Camargo Olimpio", "Web Prêmios", 6381, "Assistente de Operações Jr"]
, [3551, "Jefferson Paixão da Silva", "Web Prêmios", 6381, "Analista de Operações Jr"]
, [3791, "Luiz Gustavo Sabo", "Web Prêmios", 6381, "Coordenador de Marketing"]
, [6021, "Vanessa Cardoso de Souza", "Web Prêmios", 6381, "Estagiária"]
, [6201, "Camila Adalgisa Pinto", "Web Prêmios", 6381, "Analista de Marketing Pleno"]
, [4531, "Diogo Branco", "Web Prêmios", 6101, "Assistente de Parcerias"]
, [3811, "Marcelo Mourao do Nascimento", "Web Prêmios", 6101, "Coordenador de Parcerias"]
, [5971, "Wellington Barbosa", "Web Prêmios", 6101, "Analista de Parcerias"]
, [3991, "Priscila Nunes Alcantara", "VTG", 3871, "Analista de Operações Pleno"]
, [6031, "Yasmin Salomão Magyar", "VTG", 3871, "Analista de Marketing Jr"]
, [4361, "Emerson Soares Moreira", "Grupo LTM", 0000, "CEO"]
, [4481,"Johnny Chi We Wei","Web Provider",4361,"COO"]
, [3511, "Humberto Rodrigues Alves","Web Prêmios",4481,"Diretor de Unidade de Negócios"]
, [4491, "Marco Antonio Desidério","Web Prêmios",3511,"Gerente de Contas"]
, [5351, "Edilaine Rocha de Godoi","Web Prêmios",4491,"Executiva de Contas Jr"]
, [5691, "Fabiana Squadroni Grando","Web Prêmios",4491,"Executiva de Contas Pleno"]
, [3701, "Leticia Ramos Batista","Web Prêmios",4491,"Executiva de Contas Pleno"]
, [3711, "Lilian Dieme Nogueira Da Silva","Web Prêmios",4491,"Executiva de Contas Senior"]
, [4661, "Natalia de Cássia Alves Galdino","Web Prêmios",4491,"Executiva de Contas Jr"]
, [4591, "Pâmela da Cruz Matheus","Web Prêmios",4491,"Executiva de Contas Pleno"]
, [4901, "Priscila Aparecida de Paula Lima","Web Prêmios",4491,"Executiva de Contas Pleno"]
, [4721, "Thainer Goerck","Web Prêmios",4491,"Executiva de Contas Senior"]
, [4741, "Thiago Alves Aguiar Santos","Web Prêmios",4491,"Executivo de Contas Jr"]
, [5931, "Tuanne Celes Vieira","Web Prêmios",4491,"Executiva de Contas Jr"]
, [6041, "Viviane Aparecida Vasques","Web Prêmios",4491,"Executiva de Contas Jr"]
, [5801, "Stephanie Almeida Gurgel","Web Prêmios",3711,"Assistente de Atendimento"]
, [6182, "Erika Massafera Poli Silva","Web Prêmios",3711,"Assistente de Atendimento"]
, [4091, "Renata Teixeira Freitas","Web Prêmios",3711,"Executiva de Contas Pleno"]
];

var idMain = 4361;
var queue = [];
var cont = 0;

//passar a posição apenas quando precisar dos subordinados 'child'
function getUsers(id, pos) {
    var _pos = pos == "child" ? 3 : 0;	
	
    var u = [];
    for (var i = 0; i < baseUsers.length; i++) {
        if (baseUsers[i][_pos] === id) {
            u[u.length] = baseUsers[i];
            if (_pos === 0) {
                break;
            }
        }
    }
    return u;
}
function writeTree(users) {
    if ($('ul.tree').length === 0) {
        $('body').append('<ul class="tree"></ul>');

        for (var i = 0; i < users.length; i++) {
            $('ul.tree').append('<li id="' + users[i][0] + '">' +
				"<h4>" + users[i][1] + "</h4>" +
				"<small>" + users[i][4] + " - " + users[i][2] + "</small>" +
			'</li>');
			cont++;
        }
        var n = getUsers(users[0][0], "child");
        users = [];
        writeTree(n);
    }
    else {
        $('li#' + users[0][3]).append('<ul data-id="' + users[0][3] + '"></ul>');

        for (var i = 0; i < users.length; i++) {
            $('ul[data-id="' + users[i][3] + '"]').append('<li id="' + users[i][0] + '">' +
				"<h4>" + users[i][1] + "</h4>" +
				"<small>" + users[i][4] + " - " + users[i][2] + "</small>" +
			'</li>');
			queue[queue.length] = users[i][0];
			cont++;
        }
		
		if (cont==baseUsers.length && queue.length === 0) {
			return;
		}
		else {
			var n = getUsers(queue[0], "child");
			
			while (n.length === 0 && queue.length > 0) {
				queue.shift();
				n = getUsers(queue[0], "child");
			}	
			if (queue.length > 0) {
				queue.shift();
				users = [];
				writeTree(n);
			}
		}
    }
}

$(document).ready(function () {
    var x = getUsers(idMain);
    writeTree(x);
});