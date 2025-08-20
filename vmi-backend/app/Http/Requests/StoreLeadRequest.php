<?php
declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $type = $this->input('type');
        $rules = [
            'type'       => ['required', 'in:contact,product'],
            'name'       => ['required', "regex:/^[\\p{L}\\s\\-\\']{2,}$/u"],
            'phone'      => ['required', 'regex:/^\\+?[1-9]\\d{7,14}$/'],
            'email'      => ['required', 'email:rfc,dns'],
            'message'    => ['nullable', 'string', 'max:2000'],
            'source'     => ['nullable', 'string', 'max:50'],
            'source_url' => ['nullable', 'url'],
        ];
        if ($type === 'product') {
            $rules += [
                'product_id'    => ['required', 'integer'],
                'product_title' => ['required', 'string', 'max:255'],
                'quantity'      => ['nullable', 'integer', 'min:1'],
            ];
        } else {
            $rules += [
                'product_id'    => ['prohibited'],
                'product_title' => ['prohibited'],
                'quantity'      => ['prohibited'],
            ];
        }
        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.regex'  => 'Имя может содержать только буквы, пробел, дефис и апостроф (минимум 2 символа).',
            'phone.regex' => 'Телефон должен быть в формате E.164 (например, +998901234567).',
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('phone')) {
            $this->merge(['phone' => preg_replace('/[^\\d\\+]/', '', (string)$this->input('phone'))]);
        }
        if ($this->has('name')) {
            $this->merge(['name' => trim(preg_replace('/\\s+/', ' ', (string)$this->input('name')))]);
        }
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation failed.',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }
}
