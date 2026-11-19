import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

type DeliveryChannel = 'whatsapp' | 'email';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [channel, setChannel] = useState<DeliveryChannel>('whatsapp');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    message: string;
    channel: DeliveryChannel;
    whatsappHref: string;
    mailtoHref: string;
  } | null>(null);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) {
      nextErrors.name = 'Informe seu nome completo.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Digite um e-mail válido para retorno.';
    }
    if (values.message.trim().length < 10) {
      nextErrors.message =
        'Conte brevemente sobre o ensaio ou evento (mínimo de 10 caracteres).';
    }
    return nextErrors;
  };

  const buildLinks = (data: FormValues) => {
    const formattedText = [
      `Olá, Gouveia Photo Art!`,
      `Nome: ${data.name.trim()}`,
      `E-mail: ${data.email.trim()}`,
      `Mensagem: ${data.message.trim()}`,
    ].join('\n');

    const whatsappHref = `${STUDIO_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
      formattedText,
    )}`;

    const mailtoSubject = encodeURIComponent(
      `Contato pelo site – ${data.name.trim()}`,
    );
    const mailtoBody = encodeURIComponent(formattedText);
    const mailtoHref = `mailto:?subject=${mailtoSubject}&body=${mailtoBody}`;

    return { whatsappHref, mailtoHref };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const { whatsappHref, mailtoHref } = buildLinks(values);
    setSubmittedData({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      channel,
      whatsappHref,
      mailtoHref,
    });
  };

  const inputBaseClass =
    'w-full px-4 py-3 text-sm sm:text-base text-white bg-[#1A1A1A] border rounded-lg placeholder:text-neutral-500 transition-all duration-200 focus:outline-none focus:border-[#1D9BF0] focus:ring-2 focus:ring-[#1D9BF0]/25';

  return (
    <section
      id="contato"
      className="py-20 sm:py-28 bg-[#1A1A1A] border-t border-white/10 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Studio Info & Location */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-medium text-[#1D9BF0] tracking-wide">
                Contato & Localização
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white text-balance">
                Vamos eternizar o seu próximo momento
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Atendemos no Setor Sul em Goiânia e realizamos coberturas em
                toda a região. Envie sua mensagem para consultar datas e
                formatos de atendimento.
              </p>
            </div>

            <div className="space-y-5 pt-2 border-t border-white/10">
              <div className="flex items-start gap-3.5 pt-4">
                <MapPin
                  className="w-5 h-5 text-[#1D9BF0] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">Endereço</p>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {STUDIO_INFO.address}
                  </p>
                  <a
                    href={STUDIO_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1D9BF0] hover:underline pt-1"
                  >
                    <span>Ver no Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone
                  className="w-5 h-5 text-[#1D9BF0] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    Telefone & WhatsApp
                  </p>
                  <a
                    href={`${STUDIO_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
                      STUDIO_INFO.whatsappDefaultMessage,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-200 hover:text-[#1D9BF0] transition-colors tabular-nums"
                  >
                    {STUDIO_INFO.phoneDisplay}
                  </a>
                  <p className="text-xs text-neutral-400">{STUDIO_INFO.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-[#222222] border border-white/10 rounded-xl">
              {submittedData ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="space-y-6 py-4"
                >
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2
                      className="w-6 h-6 text-[#1D9BF0] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-semibold text-white">
                        Mensagem pronta para envio
                      </h3>
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        Obrigado, {submittedData.name}. Seus dados foram
                        validados e formatados. Clique no canal abaixo para
                        concluir o envio diretamente com a equipe da{' '}
                        {STUDIO_INFO.name}.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#1A1A1A] border border-white/10 space-y-1.5 text-sm text-neutral-300">
                    <p>
                      <span className="text-neutral-400">Nome:</span>{' '}
                      <span className="text-white">{submittedData.name}</span>
                    </p>
                    <p>
                      <span className="text-neutral-400">E-mail:</span>{' '}
                      <span className="text-white">{submittedData.email}</span>
                    </p>
                    <p className="pt-1">
                      <span className="text-neutral-400">Mensagem:</span>{' '}
                      <span className="text-neutral-200">
                        {submittedData.message}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={submittedData.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 ${
                        submittedData.channel === 'whatsapp'
                          ? 'bg-[#1D9BF0] text-white hover:bg-[#1A8CD8]'
                          : 'bg-white/10 text-white border border-white/15 hover:bg-white/15'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enviar pelo WhatsApp</span>
                    </a>

                    <a
                      href={submittedData.mailtoHref}
                      className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 ${
                        submittedData.channel === 'email'
                          ? 'bg-[#1D9BF0] text-white hover:bg-[#1A8CD8]'
                          : 'bg-white/10 text-white border border-white/15 hover:bg-white/15'
                      }`}
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Abrir no E-mail</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedData(null);
                        setValues({ name: '', email: '', message: '' });
                      }}
                      className="px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Nova mensagem
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
                    <span className="text-sm font-medium text-white">
                      Preferência de envio
                    </span>
                    <div
                      role="group"
                      aria-label="Escolher canal de envio"
                      className="inline-flex p-1 bg-[#1A1A1A] border border-white/10 rounded-lg self-start"
                    >
                      <button
                        type="button"
                        onClick={() => setChannel('whatsapp')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                          channel === 'whatsapp'
                            ? 'bg-[#1D9BF0] text-white'
                            : 'text-neutral-300 hover:text-white'
                        }`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>WhatsApp</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setChannel('email')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                          channel === 'email'
                            ? 'bg-[#1D9BF0] text-white'
                            : 'text-neutral-300 hover:text-white'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>E-mail</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-neutral-200"
                      >
                        Nome
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Seu nome completo"
                        value={values.name}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, name: e.target.value }));
                          if (errors.name) {
                            setErrors((prev) => ({ ...prev, name: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.name)}
                        className={`${inputBaseClass} ${
                          errors.name ? 'border-rose-400' : 'border-white/15'
                        }`}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1.5 text-xs text-rose-400 pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-neutral-200"
                      >
                        E-mail
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@exemplo.com"
                        value={values.email}
                        onChange={(e) => {
                          setValues((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.email)}
                        className={`${inputBaseClass} ${
                          errors.email ? 'border-rose-400' : 'border-white/15'
                        }`}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1.5 text-xs text-rose-400 pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-neutral-200"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="Conte sobre a data prevista, local em Goiânia e o tipo de ensaio ou evento..."
                      value={values.message}
                      onChange={(e) => {
                        setValues((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }));
                        if (errors.message) {
                          setErrors((prev) => ({
                            ...prev,
                            message: undefined,
                          }));
                        }
                      }}
                      aria-invalid={Boolean(errors.message)}
                      className={`${inputBaseClass} resize-y min-h-[120px] ${
                        errors.message ? 'border-rose-400' : 'border-white/15'
                      }`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1.5 text-xs text-rose-400 pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#1D9BF0] rounded-lg transition-all duration-200 hover:bg-[#1A8CD8] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#222222]"
                    >
                      <Send
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                      <span>
                        {channel === 'whatsapp'
                          ? 'Preparar envio via WhatsApp'
                          : 'Preparar envio por E-mail'}
                      </span>
                    </button>

                    <span className="text-xs text-neutral-400">
                      Resposta rápida pelo {STUDIO_INFO.phoneDisplay}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
