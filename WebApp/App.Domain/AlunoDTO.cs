using System.ComponentModel.DataAnnotations;

namespace App.Domain
{
    public class AlunoDTO
    {        
        public int id { get; set; }

        [Required(ErrorMessage = "O nome é de Preenchimento Obrigatório")]
        [StringLength(50, ErrorMessage = "Nome tem no mínimo 2 caracteres e no máximo 50", MinimumLength = 2)]
        public string nome { get; set; }
        public string sobrenome { get; set; }
        public string telefone { get; set; }

        [RegularExpression(@"[0-9]{4}\-[0-9]{2}", ErrorMessage = "A data está fora do formato YYYY-MM")]
        public string data { get; set; }

        [Required(ErrorMessage = "O RA é de Preenchimento Obrigatório")]
        [Range(1, 9099, ErrorMessage = "O intervalo para cadastro de RA está entre 1 e 9099")]
        public int? ra { get; set; }
    }
}