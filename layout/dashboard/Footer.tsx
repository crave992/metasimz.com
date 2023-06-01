export default function Footer() {
  return (
    <section>
      <div className="h-[2px] bg-gradient-to-r from-[#75BDFF] to-[#A12669]">
      </div>
      <div className="mx-auto flex flex-col-reverse lg:flex-row justify-between p-10 lg:px-2 gap-10">
        <div className="roboto font-bold text-[#6B5F77]">
          Copyright © 2022 Metasimz.
          <br className="lg:hidden"/> 
            All rights reserved.
        </div>
        <div className="flex gap-5">
          <div className="roboto font-bold text-[#6B5F77]">
            <a href="/privacy">Privacy Policy</a></div>
            <div className="roboto font-bold text-[#6B5F77]">
              <a href="/termsofservice">Terms of Service</a>
            </div>
        </div>
      </div>
    </section>
  )
}