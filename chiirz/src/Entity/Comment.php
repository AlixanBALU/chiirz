<?php

namespace App\Entity;

use App\Repository\CommentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommentRepository::class)]
class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $text = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'fk_comment')]
    private ?self $comment = null;

    #[ORM\OneToMany(mappedBy: 'comment', targetEntity: self::class)]
    private Collection $fk_comment;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $fk_user = null;

    #[ORM\ManyToOne(inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Itinerary $fk_itinerary = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::SMALLINT, nullable: true)]
    private ?int $rate = null;

    public function __construct()
    {
        $this->fk_comment = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->text;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getComment(): ?self
    {
        return $this->comment;
    }

    public function setComment(?self $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getFkComment(): Collection
    {
        return $this->fk_comment;
    }

    public function addFkComment(self $fkComment): self
    {
        if (!$this->fk_comment->contains($fkComment)) {
            $this->fk_comment->add($fkComment);
            $fkComment->setComment($this);
        }

        return $this;
    }

    public function removeFkComment(self $fkComment): self
    {
        if ($this->fk_comment->removeElement($fkComment)) {
            // set the owning side to null (unless already changed)
            if ($fkComment->getComment() === $this) {
                $fkComment->setComment(null);
            }
        }

        return $this;
    }

    public function getFkUser(): ?User
    {
        return $this->fk_user;
    }

    public function setFkUser(?User $fk_user): self
    {
        $this->fk_user = $fk_user;

        return $this;
    }

    public function getFkItinerary(): ?Itinerary
    {
        return $this->fk_itinerary;
    }

    public function setFkItinerary(?Itinerary $fk_itinerary): self
    {
        $this->fk_itinerary = $fk_itinerary;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getRate(): ?int
    {
        return $this->rate;
    }

    public function setRate(?int $rate): self
    {
        $this->rate = $rate;

        return $this;
    }
}
