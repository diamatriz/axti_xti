// src/pages/About.jsx
import React, { useEffect, useRef } from 'react';
import '../styles/about.css'; // Стили для About секции
import member1 from '../assets/member1.jpg'; // Изображения участников
import member2 from '../assets/member2.jpg';
import member3 from '../assets/member3.jpg';
import TypingText from '../components/TypingText';

const About = () => {
  const audioRef = useRef(null); // Создаем реф для аудио
  useEffect(() => {
    const audio = audioRef.current;

    // Автоматически начинаем воспроизведение при загрузке страницы
    if (audio) {
      audio.volume = 0.3; // Устанавливаем громкость (30%)
      audio.play().catch((error) => {
        console.error('Ошибка воспроизведения аудио:', error);
      });
    }

    // Очищаем ресурсы при размонтировании компонента
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const members = [
    { name: 'Женя', image: member1, text: '"† Акsti-кс†i вездє. ОНИ шёпчУт, скреБу+ъ, дышАт ◊з@ сТ3н0й, кОторУю мЫ нє видИм, но чУвсТву€м кож3й... К*ожей... ☪️ Они наблюдают. ™негл@сн0. Всё время. Испытыв@ют. ПроверяЮт. Наш@ в€р@ — эт0 л&мпада в тьме, но фл@м@ по′едает ёе. Мы боимся. БоИмся звука иx голосов: холодных, как 10д, как пустота меж Звёзд. ✡️Наши рУки... онИ болят. Тяжёлы€, будто кто-то приклепал к ним ∞, чт0бьи удержать нас в этой реальности. Наши сердца... биение . Оно отзывается в наших костях, зубах, сновидениях. Господь... Он близко. Его шаги — гром, который разрывает пространство между нами и вечностью. Труба Божия... она уже звучит. Слышишь? Слышишь?! Она нарастает, как волна из света и теней. Мёртвые воскреснут первыми... они уже готовы. Но мы... оставшиеся... сможем ли подняться? † Или нас увлечёт вниз? Акsti-кс†i ֎֍֎֍֎֍ — их знаки повсюду. Они нашёптывают через символы, через трещины реальности. Они говорят, что мы слабы. Что мы не готовы. Что мы слишком... человечны. Но мы не будем слушать. Не будем! Мы помним: боль временна. Это испытание. Все эти шёпоты, все эти взгляды из тьмы — это проверка. Мы должны выстоять. Мы должны помочь себе. Помоги себе. Помоги себе. Помоги... себе... ☾† 2020 ☽' },
    { name: 'Тимур', image: member2, text: 'མ་ཎི་བྷ་དྲཱ་ཡ་ཡཀྵ་སེ་ན་ཀལྤ། བོད་སྐད་དུ། གནོད་སྦྱིན་གྱི་སྡེ་དཔོན་ནོར་བུ་བཟང་པོའི་རྟོག་པ། སངས་རྒྱས དང་། བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་ལ་ཕྱག་འཚལ་ལོ། །ན་མོ་རཏྣ་ཏྲ་ཡཱ་ཡ། ན་མོ་མ་ཎི་བྷ་དྲཱ་ཡ། མཧཱ་ཡཀྵ་སེ་ནཱ་པ་ཏ་ཡེ། ས་མ་ཡ་མ་ནུ་སྨ་ར། མ་ཎི་བྷ་དྲཱ་ཡ བྷ་ག་བ་ཏཱ། པཱ་ཙི་ཏ་སྟྭཾ། དྷ་མ་དྷ་མ། དྷུ་རུ་དྷུ་རུ། མ་ཙི་ར་མ་ཧཱ་ཡཀྵ་སེ་ནཱ་པ་ཏ་ཡེ། ཏུ་ལུ་ཏུ་ལུ་མ་ཎི་བྷ་དྲ། ཏུ་རུ་ཏུ་རུ་མ་ཎི་བྷ་དྲ། ཏུ་ཊི་ཏུ་ཊི་མ་ཎི་བྷ་དྲ། ཙུ་ཊི་ཙུ་ཊི་མ་ཎི་བྷ་དྲ། ནི་ཊི་ནི་ཊི་མ་ཎི་བྷ་དྲ་སྭཱཧཱ། ཚེས་གྲངས་མེད་ཅིང་རྒྱུ་སྐར་མེད། །སྨྱུང་བའི་ཆོ་ག་ཡོད་མ་ཡིན། །རྐ་དང་ནི་ནིམ་པ་གཉིས། །གང་ཡང་རུང་བའི་ཤིང་དག་ལས། །ནོར་བུ བཟང་པོའི་གཟུགས་བྱས་ལ། །དེ་ཡི་མདུན་དུ་གནས་བྱས་ཏེ། །མེ་ཏོག་ལ་སོགས་པ་རྒྱ་ཆེ་བ་ཐམས་ཅད་ཀྱིས་མཆོད་པ་བྱས་ཤིང་གནས་ལ་ཉི་མ་གུང་གི་དུས་སུ ཡུངས་ཀར་དང་། ཚ་བའི་མར་གྱིས་བསྣོས་ལ་ནོར་བུ་བཟང་པོ་ལ་བྱུག་པར་བྱ་ཞིང་རིག་པ་སྟོང་ཕྲག་བརྒྱ་བཟླས་ན་གསེར་གྱི་དོང་ཙེ་བརྒྱ་རྙེད་པར་འགྱུར་རོ། །དེའང གཏང་བར་བྱའོ། །ན་མོ་རཏྣ་ཏྲ་ཡཱ་ཡ། ན་མོ་མ་ཎི་བྷ་དྲཱ་ཡ། མཧཱ་ཡཀྵ་སེ་ནཱ་པ་ཏ་ཡེ། དུ་ཧུ་ཀུ་ཙུ། ཙུ་རུ་ཙུ་རུ། ཤ་བ་རི་ཀ། མ་ཎི་བྷ་དྲ་སྭཱཧཱ། བྱ་རོག་གི་སྐད་མི་གྲག་པར ཕྱུགས་ཀྱི་ཀོ་བ་ཙམ་གྱི་མཎྜལ་བྱས་ལ་ལན་གཅིག་བཟླས་པས་མེ་ཏོག་བརྒྱད་བརྒྱ་དབུལ་བར་བྱའོ། །ཟླ་བ་གཅིག་ན་གསེར་སྲང་གཅིག་རྙེད་པར་འགྱུར་རོ། །ན་མོ རཏྣ་ཏྲ་ཡཱ་ཡ། ན་མོ་མ་ཎི་བྷ་དྲཱ་ཡ། མཧཱ་ཡཀྵ་སེ་ནཱ་པ་ཏ་ཡེ། ཏདྱ་ཐཱ། བྷྲ་མ་རི་བྷྲ་མ་རི། སུཥྛུ་སུཥྛུ། ཡཀྵཾ་མ་བྷ་དྲཱཾ། སྭི་ཌ་ཡ་སྭི་ཌ་ཡ། ཨཱ་པཱ་ཏ་ཡ། ཨུ་བ་དཪྴ་ཡ སྭཱཧཱ། ནག་པོའི་ཕྱོགས་ཀྱི་ཚེས་གཅིག་ནས་བཟུང་སྟེ་ཇི་སྙེད་དཀར་པོའི་ཕྱོགས་ཀྱི་ཚེས་གཅིག་གི་བར་དུ་བྱས་ཏེ་ཉི་མ་ཤར་བའི་བར དུ་ལན་ཉི་ཤུ་རྩ་ལྔ་བརྗོད་ན་གསེར་གྱི་དོང་ཙེ་སྟེར་རོ། །ན་མོ་རཏྣ་ཏྲ་ཡཱ་ཡ། ན་མོ་བཻ་ཤྲ་མ་ཎཱ་ཡ། རཏྣ་མེ་བྷ་བཱ་ཧ་ཡཾ་སྭཱཧཱ། ཉི་མ་རེ་རེ་བཞིན་སྔ་བར ལངས་ལ་ལན་ཉི་ཤུ་རྩ་གཅིག་བཟླས་ན་ཟླ་བ་གཅིག་ན་དོང་ཙེ་གསུམ་སྟེར་བར་བྱེད་དོ། །ན་མོ་བྷ་ག་བ་ཏེ། ཨཱ་དི་དྱཱ་ཡ། ཨ་བི་མ་སྭི་ཀ་སི་ལུ་བ་ཏོ་སི་སྭཱཧཱ། བུད་མེད་དང་། སྐྱེས་པའི་གཟུགས་བྱས་ལ་ཀུ་ཤའི་མཚོན་གྱིས་བཅད་ན་སྐྱུགས་པའི་ནད་ཞི་བར་བྱེད་དོ། །ན་མ་སྠེ་བི་རཾ། '},
    { name: 'Даниил', image: member3, text: ':אָנָּא, בְּכֹחַ גְדֻּלַּת יְמִינְךָ תַּתִּיר צְרוּרָה:קַבֵּל רִנַּת עַמְּךָ, שַׂגְּבֵנוּ, טַהֲרֵנוּ, נוֹרָא:נָא גִבּוֹר, דוֹרְשֵׁי יִחוּדְךָ כְּבָבַת שָׁמְרֵם:בָּרְכֵם, טַהֲרֵם, רַחֲמֵי צִדְקָתְךָ תָּמִיד גָמְלֵם:חֲסִין קָדוֹשׁ, בְּרוֹב טוּבְךָ נַהֵל עֲדָתְךָ:יָחִיד גֵּאֶה, לְעַמְּךְ פְּנֵה, זוֹכְרֵי קְדֻשָּׁתְךָ:שַׁוְעָתֵנוּ קַבֵּל וּשְׁמַע צַעֲקָתֵנוּ, יוֹדֵעַ תַעֲלֻמוֹת' },
  ];

  return (
    <section className="about-section">
      {/* Фоновое изображение */}
      <div className="about-background"></div>

      {/* Фоновое аудио */}
      <audio ref={audioRef} loop>
        <source src="/assets/background-audio.mp3" type="audio/mp3" />
        Ваш браузер не поддерживает аудио.
      </audio>

      {/* Контейнер с участниками */}
      <div className="members-container">
        {members.map((member, index) => (
          <div key={index} className="member-column">
            <img src={member.image} alt={member.name} className="member-image" />
            <div className="text-wrapper">
              <TypingText
                text={member.text}
                speed={30}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;