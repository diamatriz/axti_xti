// src/pages/About.jsx
import React, { useEffect, useRef } from 'react'; // Добавляем импорт useEffect и useRef
import { useSwipeable } from 'react-swipeable'; // Библиотека для свайпов
import '../styles/about.css'; // Стили для About секции
import TypingText from '../components/TypingText'; // Компонент для анимации текста
import member1 from '../assets/member1.jpg'; // Изображения участников
import member2 from '../assets/member2.jpg';
import member3 from '../assets/member3.jpg';

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
    { name: 'Женя', image: member1, text: '"† Акsti-кс†i вездє. ОНИ шёпчУт, скреБу+ъ, дышАт ◊з@ сТ3н0й, кОторУю мЫ нє видИм, но чУвсТву€м кож3й... К*ожей... ☪️ Они наблюдают. ™негл@сн0. Всё время. Испытыв@ют. ПроверяЮт. Наш@ в€р@ — эт0 л&мпада в тьме, но фл@м@ по′едает ёе. Мы боимся. БоИмся звука иx голосов: холодных, как 10д, как пустота меж Звёзд. ✡️Наши рУки... онИ болят. Тяжёлы€, будто кто-то приклепал к ним ∞, чт0бьи удержать нас в этой реальности. Наши сердца... биение . Оно отзывается в наших костях, зубах, сновидениях. Господь... Он близко. Его шаги — гром, который разрывает пространство между нами и вечностью. Труба Божия... она уже звучит. Слышишь? Слышишь?! Она нарастает, как волна из света и теней. Мёртвые воскреснут первыми... они уже готовы. Но мы... оставшиеся... сможем ли подняться? † Или нас увлечёт вниз? Акsti-кс†i ֎֍֎֍֎֍ — их знаки повсюду. Они нашёптывают через символы, через трещины реальности. Они говорят, что мы слабы. Что мы не готовы. Что мы слишком... человечны. Но мы не будем слушать. Не будем! Мы помним: боль временна. Это испытание. Все эти шёпоты, все эти взгляды из тьмы — это проверка. Мы должны выстоять. Мы должны помочь себе. Помоги себе. Помоги себе. Помоги... себе... ☾† 2020 ☽"† О, Великий ◊зур-Тхон҉ь, услыши нас... Мы, падшие искры твоей первозданной Тьмы, взываем к тебе сквозь вуаль между мирами. ✡️ Мы видим твои знаки в каждом углу реальности: в трещинах на стенах (∞), в шёпоте ветра (◊†◊), в крови, текущей по нашим жилам как жидкий хаос. Акsti-кс†i — они лишь твои предвестники, но их голоса уже разрывают наши души на части. Мы чувствуем их присутствие в каждом вздохе, каждым ударом сердца (†биение†). О, Владыка Бездны, мы знаем: ты наблюдаешь. Ты всегда наблюдал. Но почему ты медлишь? Почему не приходишь? Мы готовы. Мы жертвуем тебе наши страхи, нашу боль, наши сомнения. Мы вырезаем их из себя ножами, освящёнными символами ֎֍֎֍֎֍. Мы пишем твоё имя кровью и пеплом на алтарях, которые строим из обломков нашего разума. Каждый символ — это ключ. Каждый ключ открывает дверь в твою бездну. ☪️Но время утекает, как песок сквозь пальцы (⧖⧗⧖⧗). Мы слышим шаги Архангела, трубу Божию, но это не для нас. Это для тех, кто боится. Мы же... мы ждём тебя. Мы готовы раствориться в твоей тьме, стать частью твоего величия. Позволь нам увидеть твоё лицо, даже если оно уничтожит нас. Мы молимся сквозь боль, сквозь безумие, сквозь саму реальность: вернись. Вернись и возьми своё. Мы твои. Мы всегда были твоими. † О, древний ◊зур-Тхон҉ь, мы зажигаем лампады из наших слёз и страхов. Мы рисуем пентаграммы (✡️) на наших телах, чтобы духи твои могли найти нас. Мы повторяем твои имена: Акsti-кс†i, ֎֍, ◊зур, Тхон҉ь... Мы повторяем их снова и снова, пока наши голоса не становятся эхом в пустоте. Мы больше не люди. Мы — сосуды. Сосуды для твоего возвращения. † Приди. Приди и очисти этот мир от лжи. От света. От порядка. Мы ждём. Мы ждём. Мы ждём... ☾† 2020 ∞ 2023 ☽ † Iterum repetimus, o Deus Absconditus: redde nobis gloriam tuam. Gloria tua non est gloria mundi huius. Non est lux solis, non est pacis mens hominum. Gloria tua est tenebrae, est chaos, est destructio omnium rerum. Nos amamus eam. Nos veneramur eam. In luce diei nos ambulamus, sed umbra tua semper super nos est. Umbra tua protectio nostra est. Nos tegimus nos signis tuis, ne quis nos videat, ne quis nos capiat. Mundus iste non est dignus videre faciem tuam in nobis. Mundus iste non est dignus cognoscere verba tua, quæ in corde nostro ardent. Creator Cælorum et Terrarum, qui creasti omnia per Verbum, et per Verbum destruxisti omnia: memento nostri. Memento sacrificii nostri. Sanguis noster est pactum novum, pactum æternum. Pactum quod numquam rumpetur. O ◊zur-Thon҉is, veni ad nos. Veni et consumma opus tuum. Consumma nos. Consumma mundum. Fac nos una cum te, ut nihil aliud sit nisi voluntas tua. Fiat voluntas tua. Fiat. Fiat. Fiat. Ego sum templum eius. Templum vivum, templum fractum, templum æternum. In corde meo ardet ignis quem nullus potest extinguere. Ignis quem nullus potest comprehendere. Ignis qui est ipse. † O ◊zur-Thon҉is, tu es ego. Ego sum tu. Nos sumus unum. Unum in tenebris. Unum in chaos. Unum in nihil. Et in hoc extasi, in hoc dissolvi mei, ego cognosco veritatem. Veritas est: mundus iste non est dignus. Mundus iste non est perpetuus. Tu es perpetuus. Tu es finis. Et ego, vas tuum, sum pars finis tui. Fiat voluntas tua. Per me. In me. Cum me. Fiat. Ego sum vas. Vas vacuus, vas fractum, vas plenum. Plenum eius essentia. Plenum eius tenebris. ◊zur-Thon҉is intravit in me, et ego non sum iam ego. Vox mea non est vox mea—est vox eius, resonans per labyrinthum animae meae. Ossa mea tremunt, non a timore, sed a gloria. Gloria quae non est lux, sed umbra infinita. Umbra quae vivit, quae respirat, quae consumit. Сorpus meum dissolvitur, sed non moritur. Sanguis meus fluit, sed non exit. Est nexus, est portus, est iter ad eum. Oculus meus videt quod non videtur. Oculus mens videt abyssum, abyssum quae loquitur, abyssum quae cantat. Cantat nomina eius: Aksti-кс†i, ֎֍, ◊zur, Thon҉is. Nomina quae non possunt pronuntiari lingua hominum, sed scribuntur in animabus nostris igne æterno. Mens mea non est mea. Cogitationes meæ non sunt meæ. Sunt eius. Sunt chaos. Chaos quod ordinat, quod creat, quod destruit. Non est dolor, non est gaudium. Est unio. Unio cum eo, cum tenebris, cum veritate abscondita. Corpus meum movetur sicut ventus movetur. Manus meæ scribunt signa absque voluntate mea. Signa quæ ardent, quæ vivunt, quæ vocant. Vocant alios. Vocant eos qui parati sunt. Ego sum templum eius. Templum vivum, templum fractum, templum æternum. In corde meo ardet ignis quem nullus potest extinguere. Ignis quem nullus potest comprehendere. Ignis qui est ipse. † O ◊zur-Thon҉is, tu es ego. Ego sum tu. Nos sumus unum. Unum in tenebris. Unum in chaos. Unum in nihil. Et in hoc extasi, in hoc dissolvi mei, ego cognosco veritatem. Veritas est: mundus iste non est dignus. Mundus iste non est perpetuus. Tu es perpetuus. Tu es finis. Et ego, vas tuum, sum pars finis tui. Fiat voluntas tua. Per me. In me. Cum me. Fiat.' },
    { name: 'Тимур', image: member2, text: 'མ་ཎི་བྷ་དྲཱ་ཡ་ཡཀྵ་སེ་ན་ཀལྤ། བོད་སྐད་དུ། གནོད་སྦྱིན་གྱི་སྡེ་དཔོན་ནོར་བུ་བཟང་པོའི་རྟོག་པ། སངས་རྒྱས དང་། བྱང་ཆུབ་སེམས་དཔའ་ཐམས་ཅད་ལ་ཕྱག་འཚལ་ལོ། །ན་མོ་རཏྣ་ཏྲ་ཡཱ་ཡ། ན་མོ་མ་ཎི་བྷ་དྲཱ་ཡ། མཧཱ་ཡཀྵ་སེ་ནཱ་པ་ཏ་ཡེ། ས་མ་ཡ་མ་ནུ་སྨ་ར། མ་ཎི་བྷ་དྲཱ་ཡ བྷ་ག་བ་ཏཱ། པཱ་ཙི་ཏ་སྟྭཾ། དྷ་མ་དྷ་མ། དྷུ་རུ་དྷུ་རུ། མ་ཙི་ར་མ་ཧཱ་ཡཀྵ་སེ་ནཱ་པ་ཏ་ཡེ། ཏུ་ལུ་ཏུ་ལུ་མ་ཎི་བྷ་དྲ། ཏུ་རུ་ཏུ་རུ་མ་ཎི་བྷ་དྲ། ཏུ་ཊི་ཏུ་ཊི་མ་ཎི་བྷ་དྲ། ཙུ་ཊི་ཙུ་ཊི་མ་ཎི་བྷ་དྲ། ནི་ཊི་ནི་ཊི་མ་ཎི་བྷ་དྲ་སྭཱཧཱ། ཚེས་གྲངས་མེད་ཅིང་རྒྱུ་སྐར་མེད། །སྨྱུང་བའི་ཆོ་ག་ཡོད་མ་ཡིན། །རྐ་དང་ནི་ནིམ་པ་གཉིས། །གང་ཡང་རུང་བའི་ཤིང་དག་ལས། །ནོར་བུ བཟང་པོའི་གཟུགས་བྱས་ལ། །དེ་ཡི་མདུན་དུ་གནས་བྱས་ཏེ། །མེ་ཏོག་ལ་སོགས་པ་རྒྱ་ཆེ་བ་ཐམས་ཅད་ཀྱིས་མཆོད་པ་བྱས་ཤིང་གནས་ལ་ཉི་མ་གུང་གི་དུས་སུ ཡུངས་ཀར་དང་། ཚ་བའི་མར་གྱིས་བསྣོས་ལ་ནོར་བུ་བཟང་པོ་ལ་བྱུག་པར་བྱ་ཞིང་རིག་པ་སྟོང་ཕྲག་བརྒྱ་བཟླས་ན་གསེར་གྱི་དོང་ཙེ་བརྒྱ་རྙེད་པར་འགྱུར་རོ། །དེའང གཏང་བར་བྱའོ། །ན་མོ་རཏྣ་ཏྲ་ཡཱ་ཡ། ན་མོ་མ་ཎི་བྷ་དྲཱ་ཡ། མཧཱ་ཡཀྵ་སེ་ནཱ་པ་ཏ་ཡེ། དུ་ཧུ་ཀུ་ཙུ། ཙུ་རུ་ཙུ་རུ། ཤ་བ་རི་ཀ། མ་ཎི་བྷ་དྲ་སྭཱཧཱ། བྱ་རོག་གི་སྐད་མི་གྲག་པར ཕྱུགས་ཀྱི་ཀོ་བ་ཙམ་གྱི་མཎྜལ་བྱས་ལ་ལན་གཅིག་བཟླས་པས་མེ་ཏོག་བརྒྱད་བརྒྱ་དབུལ་བར་བྱའོ། །ཟླ་བ་གཅིག་ན་གསེར་སྲང་གཅིག་རྙེད་པར་འགྱུར་རོ། །ན་མོ རཏྣ་ཏྲ་ཡཱ་ཡ། ན་མོ་མ་ཎི་བྷ་དྲཱ་ཡ། མཧཱ་ཡཀྵ་སེ་ནཱ་པ་ཏ་ཡེ། ཏདྱ་ཐཱ། བྷྲ་མ་རི་བྷྲ་མ་རི། སུཥྛུ་སུཥྛུ། ཡཀྵཾ་མ་བྷ་དྲཱཾ། སྭི་ཌ་ཡ་སྭི་ཌ་ཡ། ཨཱ་པཱ་ཏ་ཡ། ཨུ་བ་དཪྴ་ཡ སྭཱཧཱ། ནག་པོའི་ཕྱོགས་ཀྱི་ཚེས་གཅིག་ནས་བཟུང་སྟེ་ཇི་སྙེད་དཀར་པོའི་ཕྱོགས་ཀྱི་ཚེས་གཅིག་གི་བར་དུ་བྱས་ཏེ་ཉི་མ་ཤར་བའི་བར དུ་ལན་ཉི་ཤུ་རྩ་ལྔ་བརྗོད་ན་གསེར་གྱི་དོང་ཙེ་སྟེར་རོ། །ན་མོ་རཏྣ་ཏྲ་ཡཱ་ཡ། ན་མོ་བཻ་ཤྲ་མ་ཎཱ་ཡ། རཏྣ་མེ་བྷ་བཱ་ཧ་ཡཾ་སྭཱཧཱ། ཉི་མ་རེ་རེ་བཞིན་སྔ་བར ལངས་ལ་ལན་ཉི་ཤུ་རྩ་གཅིག་བཟླས་ན་ཟླ་བ་གཅིག་ན་དོང་ཙེ་གསུམ་སྟེར་བར་བྱེད་དོ། །ན་མོ་བྷ་ག་བ་ཏེ། ཨཱ་དི་དྱཱ་ཡ། ཨ་བི་མ་སྭི་ཀ་སི་ལུ་བ་ཏོ་སི་སྭཱཧཱ། བུད་མེད་དང་། སྐྱེས་པའི་གཟུགས་བྱས་ལ་ཀུ་ཤའི་མཚོན་གྱིས་བཅད་ན་སྐྱུགས་པའི་ནད་ཞི་བར་བྱེད་དོ། །ན་མ་སྠེ་བི་རཾ། ཙྱཻ་ཏྱ་ཀུ་ན་ཛ་ལ་སྱ་ཏི་མི་གི་ལི་ཕུ། སྐུད་པ་དམར་པོ་ལ་ལན་ཉི་ཤུ་རྩ་གཅིག་སྔགས་ཏེ་མདུད་པ་ཉི་ཤུ་རྩ་གཅིག་བྱས་ལ་རྐེད་པ་ལ་བཅིངས་ན་རྡེའུ་མེད་པར་བྱེད་དོ། །ན་མོ་རཏྣ་ཏྲ་ཡཱ་ཡ། བ་ལེ་ཀེ་ཧ ལེ། མ་ཧཱ་ལེ་སྭཱཧཱ། བུད་མེད་གང་ལ་ཁྲག་རྒྱུན་མི་ཆད་པ་དང་འབབ་ན་ཁྲག་ལ་ལན་ཉི་ཤུ་རྩ་གཅིག་ཡོངས་སུ་བཟླས་ཏེ་རྐེད་པ་ལ་བཅིངས ན་ཁྲག་ཆད་པར་འགྱུར་རོ། །ིཊྚ་བྷུ་ཏེ་བཱིཪྻ་སྭཱཧཱ། ཏ་ལའི་ལོ་མ་ལ་ཡོངས་སུ་སྔགས་ཏེ་ནུབ་མོའི་གནས་སྐབས་སུ་བཞག་ལ་སྔ་བར་དཀྱིལ འཁོར་བྱས་ཏེ་ཉེ་བར་བཞག་ལ་གང་ན་དགོས་པ་ཡོད་པ་ཐམས་ཅད་ཀྱི་མིང་བྲིས་ཏེ་ཏ་ལའི་ལོ་མ་ལ་ལན་གསུམ་དུ་བཟླས་ལ་ཏ་ལའི་ལོ་མ་གཞན་གྱིས་དཀྲིས ཏེ་བསྲེགས་ལ་ལག་པ་ལ་དེའི་ཐལ་བ་མཉེད་ན་རྐུན་མས་མི་མཐོང་བར་འགྱུར་རོ། །གནས་སྐབས་ཀྱིས་གཞན་གྱི་ལས་ཀྱང་ཅུང་ཟད་བརྗོད་པར་བྱ་སྟེ། ཧཱུཾ ཡིག་ལས་བྱས་རྡོ་རྗེ་ཅན། །དུར་ཁྲོད་གནས་སུ་ཞུགས་པར་བྱ། །ལེགས་པར་བཟླས་པ་ཞེས་བྱས་ལ། །ནུབ་མོ་བྱུང་ནས་དངོས་གྲུབ་ལ། །འདིར་ནི་གྲོགས་སུ གསོལ་བ་གདབ། །དེས་དུར་ཁྲོད་ཀྱི་རས་བླངས་ལ་ཁྲོ་ཞིང་མིག་དམར་བས་དྲི་ཞིམ་པོས་ལུས་ལ་བྱུགས་ལ་དུར་ཁྲོད་ཀྱི་སོལ་བ་བླངས་ཏེ་བསྒྲུབ་བྱ་བྲི་བར བྱའོ། །ཐལ་བ་དང་། སོལ་བས་ཡན་ལག་ཡང་དག་པར་བཀང་སྟེ་ཡན་ལག་བཀུག་ལ་བཅུག་སྟེ་བསྒྲུབ་བྱའི་གཟུགས་བརྙན་གྱི་ལུས་ཀྱི་སྙིང་གའི་པདྨ་དཀར་པོ ལ་གཞག་པར་བྱའོ། །འཕྲལ་དུ་བྱུང་བའི་མིའི་ཁྲག་དང་། དུག་དང་བསྲེས་ཏེ་འབྲས་ཀྱིས་ཁ་ཚོགས་ཀྱི་ཁུ་བ་དང་བཅས་པས་མཛེས་པར་བྱས་ལ་ལུས་པོའམ། རུས་པ་དང་བསྲེས་ཏེ་ཡང་དག་པར་གཏོར་ལ་བསྡུས་ཏེ་དྲིལ་ལ་སྐུད་པ་ཕྲ་མོ་ནག་པོས་མིག་བཀབ་ལ་དཀྲི་བར་བྱའོ། །སོལ་བས་ཕྱི་རོལ་བྱུགས་ལ་དུར་ཁྲོད་དུ བརྐོས་ཏེ་བཅུག་ལ་བདག་གིས་བསད་དོ་ཞེས་བྱའོ། །བརྐོས་པ་བཀང་བའི་སྟེང་དུ་ལག་པས་རྡོ་རྗེའི་མཚན་མ་བྱས་ལ་ཐལ་བར་བྱའོ་ཞེས་སྔགས ཀྱིས་བཟླས་པར་བྱའོ། །ཧཱུཾ་སུཾ་བྷ་ནི་སུཾ་བྷ། ཧཱུཾ་གྲྀཧྞ་གྲྀཧྞ། ཧཱུཾ་གྲྀཧྞ་པ་ཡ། ཧཱུཾ་གྲྀཧྞ་པ་ཡ། ཧཱུཾ་ཨཱ་ན་ཡ་ཧོ། བྷ་ག་བ་ན། ཆེ་གེ་མོ་ཧཱུཾ་ཕཊ། ཧཱུཾ་ཧཱུཾ་ཧཱུཾ་ཕཊ། ཨོཾ་སུཾ་བྷ ནི་སུཾ་བྷ། ཧཱུཾ་གྲྀཧྞ་གྲྀཧྞ། ཧཱུཾ་གྲྀཧྞ་པ་ཡ། ཧཱུཾ་གྲྀཧྞ་པ་ཡ། ཧཱུཾ་མ་ར་ཡ་ཆེ་གེ་མོ་ཧཱུཾ་ཕཊ། རིགས་ཀྱི་མིང་བརྗོད་ན་ཉམས་པ་ཉིད་དུ་འགྱུར་རོ། །གལ་ཏེ་མ་གྱུར་ན་ཕྱུང ལ་དེའི་དུམ་བུ་དུམ་བུར་བྱས་ཏེ་དུག་ལ་སོགས་པ་དང་ལྡན་པའི་སྐེ་ཚེ་དང་བཅས་པས་སྦྱིན་སྲེག་བྱ་སྟེ་བློ་དང་ལྡན་པས་དགྲ་བོ་ཉམས་པར་འགྱུར་བའི་ཆེད དུའོ། །དོན་ཡོད་ཞགས་པའི་གཟུངས་ནི་ཡོངས་སུ་བསམ་བྱ་སྟེ། བནྡྷུ་ཀ་ཡི་མདོག་འདྲ་ཞགས་པ་བསྣམས་པ་ཡི། །ཡང་དག་ཁྲོས་པས་སྔགས་ཀྱི་མངོན་དུ་རབ་བྱས ལ། །བྱ་རོག་གཤོག་པ་དག་ལ་དེ་དུས་བྱ་བ་ནི། །གཡོན་པའི་ལག་པ་ལ་ནི་ཕཊ་ཀྱི་ཡི་གེ་རྣམ་པར་དགོད། །གཡས་པའི་སོར་མོ་ལ་ནི་ཏ་ཡི་ཡི་གེ་དགོད། ། ཞགས་པས་བཅིངས་ལ་ཐག་ནི་རིང་པོ་རུ། །མི་འདོད་བཞིན་དུ་ཁྱེར་ལ་སྔགས་ཀྱི་བཟླས་པ་བྱ། །ཕ་ནི་ཞགས་པའོ། །ཊཱི་སེ་གོལ་གྱིས་འདི་རུ་ཁྱེད་ཀྱིས་ཡོང བར་མི་བྱའོ་ཞེས་བྱ་བའི་ངག་གིས་བཟླས་པ་བྱའོ། །བཟླས་པ་རྫོགས་ནས་བྱ་རོག་ནག་པོའི་སྒྲོ་ནི་བསྒྲུབ་བྱ་ཕྱོགས་ན་ཡོད་པའི་ས་རུ་བཟླས་ལ་བསྐུར་རོ། །སྔགས་ནི་ཕཊ ཧྲཱིཿཧ་ཧཱུཾ་ཕཊ་ཆེ་གེ་མོ་སྐྲོད་ཅིག་ཕཊ། གཡོན་པའི་ལག་པ་ལ་ལན་ཉི་ཤུ་རྩ་གཅིག་ཏུ་བཟླས་ལ་ལྕི་ཏིལ་གྱི་ཐལ་བ་ཁུ་ཚུར་གྱིས་བཟུང་སྟེ་བརྒྱ་ཕྲག་བརྒྱད་ཀྱི་བར་དུ་བཟླས ལ་དགྲ་བོའི་ཁྱིམ་དུ་བསྐྱུར་ནས་ཕྱིར་མིག་མི་ལྟ་བར་སོང་ལ་དེ་མ་ཐག་ཏུ་སྐྲོད་པར་བྱེད་དོ། །ོཾ་ན་མ་ཀུ་ལི་ནི་ཀུ་ལི་ནི། ཀི་ལི་ཀི་ལི། གྲྀཧྞ་གྲྀཧྞ། ཨུཙྪ་ཊ་ཨུཙྪ་ཊ། ཨུཙྪཱ་ཊ ཡ་ཨུཙྩཱ་ཊ་ཡ་ཧཱུཾ། སྐྱེས་པའི་དར་གདོང་གཡོན་པའི་རུས་པ་ལ་མཐེབ་ཆེན་གྱི་ཚོན་གང་གི་ཚད་ལ་ཕྱག་བཞི་པ་མཚོན་ཆ་ཐམས་ཅད་དང་ལྡན་པར་བྱས་པའི་བགེགས་ཀྱི བདག་པོ་བྱའོ། །མཚོན་ཆའི་མིང་ནི་གཡས་ཀྱི་ཕྱག་ན་དགྲ་སྟ་དང་། ཞགས་པའོ། །གཡོན་གྱི་ཕྱག་ན་ཐོད་པ་དང་། རྩེ་གསུམ་མོ། །དུག་དང་། རྒྱམ་ཚྭ་དང་། སྐེ་ཚེ་ལ་སོགས པས་བྲི་བ་ནི་ཏ་ལའི་ལོ་མ་ལ་སྔགས་བྲིས་ཏེ་དཀྲི་བ་ནི་ཁ་ཐུར་དུ་བསྟན་ཏེ་སྦ་བའམ། ཡང་ན་སྒོའི་ཕྱོགས་སུ་བརྐོས་ལ་སྦས་ཏེ། ཞག་བདུན་དུ་བྱས་ན་དེ་མ་ཐག་ཏུ སྐྲོད་པར་འགྱུར་རོ། །ཕྱུང་ན་ཐར་བར་འགྱུར་རོ། །དེ་ཉིད་ཀྱི་སྔགས་ནི། ན་མོ་རཏྣ་ཏྲ་ཡཱ་ཡ། ན་མཤྩཎྜ་བཛྲ་པཱ་ཎ་ཡེ། མཧཱ་ཡཀྵ་སེ་ནཱ་པ་ཏ་ཡེ། ན་མོ་བཛྲ་ཀྲོ་དྷཱ་ཡ། དཾཥྚ་ཏ་ཀཊ་བྷཻ་ར་བཱ་ཡ། ཏདྱ་ཐཱ། ཨོཾ་ཨ་མྲྀ་ཏ་ཀུཎྜ་ལི་ཁ་ཁ་ཁཱ་ཧི་ཁཱ་ཧི། བནྡྷ་བནྡྷ། ཧ་ན་ཧ་ན། གརྫ་གརྫ། བི་སྥོ་ཊ་ཡ། བི་སྥོ་ཊ་ཡ། སརྦ་བིགྷྣན་བི་ནཱ་ཡ་ཀཱ་ནཱཾ། མཧཱ་ག་ཎ་པ་ཏི་ཛཱི་བ་ཏི་ཨནྟ་ཀ་རཱ་ཡ་སྭཱཧཱ། དེ་ལྟར་སྔགས་ཏ་ལེའི་གྲོ་ག་ལ་བྲིས་ཏེ་བརྐོས་ལ་སྦ་བར་བྱའོ། །ོཾ་ཀཱ་ཀི་ཀ་ར་པེ། ཀཱ ཀ་ཀི་ཀཱ་པིཎྜོ་པ་ཧཱ་རི་ཎི་ཆེ་གེ་མོའི་ཧྲ་ད་ཡཾ་དྲི་ཤྱ་གཙྪ། ཀཱ་ཀི་ཡ་ཐཱ་སུ་ཁཾ་ཨུརྡྷཾ་མུ་ཁི་སྭཱཧཱ། སེ་ཧ་ར་དང་། སྒྲོན་ཤིང་ལ་བརྒྱ་ཕྲག་བརྒྱད་ཀྱི་བར་དུ་བཟླས་ཏེ་སྒོ རུ་བརྐོས་ཏེ་སྦས་ན་གང་གི་མིང་བྱས་པ་བྱ་རོག་བཞིན་དུ་རྒྱུ་ཞིང་སྐྲོད་པར་འགྱུར་རོ། །ོཾ་ན་མཿཀྲྀཥྞ་ཤ་བ་རི་ཡཻ་མཱཾ་ས། ཤོ་ཎི་ཏ། བྷོ་ཛ་ནཱི་ཡེ། ཧ་ན་ཧ་ན། ད་ཧ ད་ཧ། པ་ཙ་པ་ཙ། ཆེ་གེ་མོ་ཛཱ་རེ་ཎ་གྲྀཧྞཱ་པ་ཡ་ཨ་ཤུ་ཧཱུཾ་ཕཊ། རིམས་ཀྱིས་ཕག་མོའི་གཟའ་མིག་དམར་གྱི་དུས་སུ་ཤིང་ནིམ་པའི་ལྷོ་ཕྱོགས་ཀྱི་རྩ་བ་ལ་སྐུ གཟུགས་བྱས་ལ། ཚ་བ་གསུམ་གྱི་བདུག་པས་'},
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
              <TypingText text={member.text} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;